import { Navbar } from '@/components/Navbar';
import { UserStats } from '@/components/UserStats';
import { ProfileMovieCard } from '@/components/ProfileMovieCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRatings } from '@/hooks/useRatings';
import { useReviews } from '@/hooks/useReviews';
import { useFavorites } from '@/hooks/useFavorites';
import { useWatchlist } from '@/hooks/useWatchlist';
import { calculateUserStats } from '@/utils/stats';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TMDB_CONFIG } from '@/config/tmdb';
import { Movie, TVDetails } from '@/types/movie';
import { toast } from '@/hooks/use-toast';

export default function Profile() {
  const { ratings, removeRating } = useRatings();
  const { reviews, removeReview } = useReviews();
  const { favorites, removeFavorite } = useFavorites();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const stats = calculateUserStats(ratings, reviews, favorites);

  const handleDeleteFavorite = (movieId: number) => {
    removeFavorite(movieId);
    toast({
      title: 'Removed from Favorites',
      description: 'Movie removed from your favorites',
    });
  };

  const handleDeleteWatchlist = (movieId: number) => {
    removeFromWatchlist(movieId);
    toast({
      title: 'Removed from Watchlist',
      description: 'Movie removed from your watchlist',
    });
  };

  const handleDeleteRated = (movieId: number) => {
    removeRating(movieId);
    toast({
      title: 'Rating Removed',
      description: 'Your rating has been removed',
    });
  };

  const handleDeleteReviewed = (movieId: number) => {
    removeReview(movieId);
    toast({
      title: 'Review Removed',
      description: 'Your review has been removed',
    });
  };

  // Get movie IDs from ratings and reviews
  const ratedMovieIds = Object.keys(ratings).map(Number);
  const reviewedMovieIds = Object.keys(reviews).map(Number);

  // Fetch media (movie or TV) for rated and reviewed IDs
  const { data: ratedMovies } = useQuery({
    queryKey: ['rated-movies', ratedMovieIds],
    queryFn: async () => {
      const movies = await Promise.all(
        ratedMovieIds.slice(0, 20).map(async (id) => {
          try {
            const { data } = await axios.get(
              `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.movieDetails(id)}`,
              { params: { api_key: TMDB_CONFIG.API_KEY } }
            );
            return data as Movie;
          } catch {
            const { data } = await axios.get(
              `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvDetails(id)}`,
              { params: { api_key: TMDB_CONFIG.API_KEY } }
            );
            // Return TV details object as-is; card detects TV via presence of name
            return data as TVDetails as any;
          }
        })
      );
      return movies;
    },
    enabled: ratedMovieIds.length > 0,
  });

  const { data: reviewedMovies } = useQuery({
    queryKey: ['reviewed-movies', reviewedMovieIds],
    queryFn: async () => {
      const movies = await Promise.all(
        reviewedMovieIds.slice(0, 20).map(async (id) => {
          try {
            const { data } = await axios.get(
              `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.movieDetails(id)}`,
              { params: { api_key: TMDB_CONFIG.API_KEY } }
            );
            return data as Movie;
          } catch {
            const { data } = await axios.get(
              `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvDetails(id)}`,
              { params: { api_key: TMDB_CONFIG.API_KEY } }
            );
            return data as TVDetails as any;
          }
        })
      );
      return movies;
    },
    enabled: reviewedMovieIds.length > 0,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback>
                    <User className="w-10 h-10" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">Movie Enthusiast</h1>
                  <p className="text-muted-foreground">
                    Member since {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <UserStats
            totalRatings={stats.totalRatings}
            totalReviews={stats.totalReviews}
            averageRating={stats.averageRating}
          />

          {/* Movie Collections */}
          <Card>
            <CardHeader>
              <CardTitle>Your Movie Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="favorites" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                  <TabsTrigger value="rated">Rated</TabsTrigger>
                  <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                </TabsList>

                <TabsContent value="favorites" className="mt-6">
                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {favorites.map((movie) => (
                        <ProfileMovieCard 
                          key={movie.id} 
                          movie={movie} 
                          onDelete={handleDeleteFavorite}
                          category="favorites"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No favorite movies yet. Start adding movies to your favorites!
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="watchlist" className="mt-6">
                  {watchlist.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {watchlist.map((movie) => (
                        <ProfileMovieCard 
                          key={movie.id} 
                          movie={movie} 
                          onDelete={handleDeleteWatchlist}
                          category="watchlist"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No movies in watchlist yet. Start adding movies to watch later!
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="rated" className="mt-6">
                  {ratedMovies && ratedMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {ratedMovies.map((movie) => (
                        <ProfileMovieCard 
                          key={movie.id} 
                          movie={movie} 
                          onDelete={handleDeleteRated}
                          category="rated"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No rated movies yet. Start rating movies you've watched!
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="reviewed" className="mt-6">
                  {reviewedMovies && reviewedMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {reviewedMovies.map((movie) => (
                        <ProfileMovieCard 
                          key={movie.id} 
                          movie={movie} 
                          onDelete={handleDeleteReviewed}
                          category="reviewed"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No reviewed movies yet. Start writing reviews for movies you've watched!
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <ScrollToTop />
    </div>
  );
}
