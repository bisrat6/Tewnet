import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { StarRating } from '@/components/StarRating';
import { GenreTag } from '@/components/GenreTag';
import { TrailerModal } from '@/components/TrailerModal';
import { ReviewModal } from '@/components/ReviewModal';
import { MovieCard } from '@/components/MovieCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { useMovieDetails, useMovieCredits, useMovieVideos } from '@/hooks/useMovieDetails';
import { useSimilarMovies } from '@/hooks/useSimilarMovies';
import { useFavorites } from '@/hooks/useFavorites';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useRatings } from '@/hooks/useRatings';
import { useReviews } from '@/hooks/useReviews';
import { getBackdropUrl, getProfileUrl } from '@/utils/imageUrl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Bookmark, Play, Calendar, Clock, Star } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '0');

  const { data: movie, isLoading } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { data: similarMovies } = useSimilarMovies(movieId);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { getRating, setRating } = useRatings();
  const { getReview, setReview } = useReviews();

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  if (isLoading || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  const trailer = videos?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
  const userRating = getRating(movieId);
  const userReview = getReview(movieId);

  const handleRatingChange = (rating: number) => {
    setRating(movieId, rating);
    toast({
      title: 'Rating Saved',
      description: `You rated ${movie.title} ${rating}/5 stars`,
    });
  };

  const handleReviewSave = (review: string) => {
    setReview(movieId, review);
    toast({
      title: 'Review Saved',
      description: 'Your review has been saved successfully',
    });
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(movie);
    toast({
      title: isFavorite(movieId) ? 'Removed from Favorites' : 'Added to Favorites',
      description: isFavorite(movieId)
        ? `${movie.title} removed from favorites`
        : `${movie.title} added to favorites`,
    });
  };

  const handleWatchlistToggle = () => {
    toggleWatchlist(movie);
    toast({
      title: isInWatchlist(movieId) ? 'Removed from Watchlist' : 'Added to Watchlist',
      description: isInWatchlist(movieId)
        ? `${movie.title} removed from watchlist`
        : `${movie.title} added to watchlist`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Backdrop Section with Overlaid Content */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[480px] sm:min-h-[560px] md:min-h-[640px]">
        <img
          src={getBackdropUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== '/placeholder.svg') target.src = '/placeholder.svg';
          }}
        />

        {/* Gradient Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
        
        {/* Content Overlaid on Backdrop */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 lg:p-16 pt-28 sm:pt-32 md:pt-36">
          <div className="flex-1 flex flex-col justify-center max-w-4xl">
            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg"
            >
              {movie.title}
            </motion.h1>
            
            {movie.tagline && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-base sm:text-xl text-white/90 italic mb-4 sm:mb-6 drop-shadow-md"
              >
                {movie.tagline}
              </motion.p>
            )}

            {/* Genres */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {movie.genres?.map((genre) => (
                <GenreTag key={genre.id} genre={genre} />
              ))}
            </motion.div>

            {/* Overview */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 max-w-3xl drop-shadow-md line-clamp-5"
            >
              {movie.overview}
            </motion.p>

            {/* Meta Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 text-white/80 mb-6 text-base"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[hsl(var(--secondary))] fill-[hsl(var(--secondary))] drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-white/60">({movie.vote_count} votes)</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 flex-wrap"
            >
              <Button 
                onClick={handleFavoriteToggle} 
                variant={isFavorite(movieId) ? 'default' : 'secondary'}
                size="lg"
                className="gap-2"
              >
                <Heart className={`w-5 h-5 ${isFavorite(movieId) ? 'fill-current' : ''}`} />
                Favorite
              </Button>
              <Button 
                onClick={handleWatchlistToggle} 
                variant={isInWatchlist(movieId) ? 'default' : 'secondary'}
                size="lg"
                className="gap-2"
              >
                <Bookmark className={`w-5 h-5 ${isInWatchlist(movieId) ? 'fill-current' : ''}`} />
                Watchlist
              </Button>
              {trailer && (
                <Button 
                  onClick={() => setTrailerOpen(true)} 
                  variant="secondary"
                  size="lg"
                  className="gap-2"
                >
                  <Play className="w-5 h-5" />
                  Trailer
                </Button>
              )}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Cast Section Below Backdrop */}
      {credits?.cast && credits.cast.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {credits.cast.slice(0, 12).map((actor) => (
                <div key={actor.id} className="flex-shrink-0 text-center">
                  <img
                    src={getProfileUrl(actor.profile_path, 'medium')}
                    alt={actor.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full mb-2 ring-2 ring-foreground/10"
                  />
                  <p className="font-semibold text-sm w-20 md:w-24 line-clamp-1">{actor.name}</p>
                  <p className="text-xs text-muted-foreground w-20 md:w-24 line-clamp-1">{actor.character}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Rating and Review Cards */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {/* User Rating */}
          <Card className="bg-background/60 backdrop-blur-2xl border-border/40 shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Your Rating</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <StarRating
                rating={userRating || 0}
                onRatingChange={handleRatingChange}
                size={36}
              />
              {userRating && (
                <p className="text-3xl font-extrabold mt-4 bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--secondary))]/60 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(251,191,36,0.25)]">
                  {userRating}/5
                </p>
              )}
            </CardContent>
          </Card>

          {/* User Review */}
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
                  <Button 
                    onClick={() => setReviewOpen(true)} 
                    variant="secondary"
                    className="w-full rounded-full"
                  >
                    Edit Review
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mb-4 text-center">
                    Share your thoughts about this movie
                  </p>
                  <Button 
                    onClick={() => setReviewOpen(true)}
                    className="bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--secondary))]/80 text-black rounded-full px-6"
                  >
                    Write a Review
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Similar Movies */}
        {similarMovies?.results && similarMovies.results.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similarMovies.results.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {trailer && (
        <TrailerModal
          open={trailerOpen}
          onOpenChange={setTrailerOpen}
          videoKey={trailer.key}
          title={movie.title}
        />
      )}

      <ReviewModal
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        initialReview={userReview}
        onSave={handleReviewSave}
        movieTitle={movie.title}
      />

      <ScrollToTop />
    </div>
  );
}
