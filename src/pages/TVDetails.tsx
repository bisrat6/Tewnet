import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { StarRating } from '@/components/StarRating';
import { GenreTag } from '@/components/GenreTag';
import { TrailerModal } from '@/components/TrailerModal';
import { ReviewModal } from '@/components/ReviewModal';
import { MovieCard } from '@/components/MovieCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { useTVDetails, useTVCredits, useTVVideos } from '@/hooks/useMovieDetails';
import { useSimilarMovies } from '@/hooks/useSimilarMovies';
import { useFavorites } from '@/hooks/useFavorites';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useRatings } from '@/hooks/useRatings';
import { useReviews } from '@/hooks/useReviews';
import { getBackdropUrl, getProfileUrl } from '@/utils/imageUrl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Bookmark, Play, Calendar, Star } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

export default function TVDetails() {
  const { id } = useParams<{ id: string }>();
  const tvId = parseInt(id || '0');

  const { data: tv, isLoading } = useTVDetails(tvId);
  const { data: credits } = useTVCredits(tvId);
  const { data: videos } = useTVVideos(tvId);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { getRating, setRating } = useRatings();
  const { getReview, setReview } = useReviews();

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  if (isLoading || !tv) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  const trailer = videos?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
  const userRating = getRating(tvId);
  const userReview = getReview(tvId);

  const handleRatingChange = (rating: number) => {
    setRating(tvId, rating);
    toast({ title: 'Rating Saved', description: `You rated ${tv.name} ${rating}/5 stars` });
  };

  const handleReviewSave = (review: string) => {
    setReview(tvId, review);
    toast({ title: 'Review Saved', description: 'Your review has been saved successfully' });
  };

  const handleFavoriteToggle = () => {
    // Casting to any to reuse Movie-based storage; minimal viable for now
    toggleFavorite({ ...(tv as any), title: tv.name });
    toast({
      title: isFavorite(tvId) ? 'Removed from Favorites' : 'Added to Favorites',
      description: isFavorite(tvId) ? `${tv.name} removed from favorites` : `${tv.name} added to favorites`,
    });
  };

  const handleWatchlistToggle = () => {
    toggleWatchlist({ ...(tv as any), title: tv.name });
    toast({
      title: isInWatchlist(tvId) ? 'Removed from Watchlist' : 'Added to Watchlist',
      description: isInWatchlist(tvId) ? `${tv.name} removed from watchlist` : `${tv.name} added to watchlist`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative h-[85vh] min-h-[700px] w-full">
        <img src={getBackdropUrl(tv.backdrop_path, 'original')} alt={tv.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 lg:p-16">
          <div className="flex-1 flex flex-col justify-center max-w-4xl">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              {tv.name}
            </motion.h1>

            {tv.tagline && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl text-white/90 italic mb-6 drop-shadow-md">
                {tv.tagline}
              </motion.p>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 mb-6">
              {tv.genres?.map((genre) => (
                <GenreTag key={genre.id} genre={genre} />
              ))}
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/90 text-lg leading-relaxed mb-6 max-w-3xl drop-shadow-md line-clamp-4">
              {tv.overview}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-6 text-white/80 mb-6 text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(tv.first_air_date).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[hsl(var(--secondary))] fill-[hsl(var(--secondary))] drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]" />
                <span className="font-semibold">{tv.vote_average.toFixed(1)}</span>
                <span className="text-white/60">({tv.vote_count} votes)</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-4 flex-wrap">
              <Button onClick={handleFavoriteToggle} variant={isFavorite(tvId) ? 'default' : 'secondary'} size="lg" className="gap-2">
                <Heart className={`w-5 h-5 ${isFavorite(tvId) ? 'fill-current' : ''}`} />
                Favorite
              </Button>
              <Button onClick={handleWatchlistToggle} variant={isInWatchlist(tvId) ? 'default' : 'secondary'} size="lg" className="gap-2">
                <Bookmark className={`w-5 h-5 ${isInWatchlist(tvId) ? 'fill-current' : ''}`} />
                Watchlist
              </Button>
              {trailer && (
                <Button onClick={() => setTrailerOpen(true)} variant="secondary" size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Trailer
                </Button>
              )}
            </motion.div>
          </div>

          {credits?.cast && credits.cast.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {credits.cast.slice(0, 10).map((actor) => (
                  <div key={actor.id} className="flex-shrink-0 text-center">
                    <img src={getProfileUrl(actor.profile_path, 'medium')} alt={actor.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full mb-2 ring-2 ring-white/20" />
                    <p className="font-semibold text-sm text-white w-20 md:w-24 line-clamp-1">{actor.name}</p>
                    <p className="text-xs text-white/70 w-20 md:w-24 line-clamp-1">{actor.character}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-background/60 backdrop-blur-2xl border-border/40 shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Your Rating</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <StarRating rating={userRating || 0} onRatingChange={handleRatingChange} size={36} />
            </CardContent>
          </Card>

          <Card className="bg-background/60 backdrop-blur-2xl border-border/40 shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Your Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 py-6">
              {userReview ? (
                <div className="space-y-4">
                  <div className="max-h-40 overflow-y-auto px-3 py-2 bg-muted/20 rounded-xl">
                    <p className="text-muted-foreground leading-relaxed">{userReview}</p>
                  </div>
                  <Button onClick={() => setReviewOpen(true)} variant="secondary" className="w-full rounded-full">Edit Review</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mb-4 text-center">Share your thoughts about this series</p>
                  <Button onClick={() => setReviewOpen(true)} className="bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--secondary))]/80 text-black rounded-full px-6">Write a Review</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {trailer && (
        <TrailerModal open={trailerOpen} onOpenChange={setTrailerOpen} videoKey={trailer.key} title={tv.name} />
      )}
      <ReviewModal open={reviewOpen} onOpenChange={setReviewOpen} initialReview={userReview} onSave={handleReviewSave} movieTitle={tv.name} />
      <ScrollToTop />
    </div>
  );
}


