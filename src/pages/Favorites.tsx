import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MovieCard } from '@/components/MovieCard';
import { MovieGrid } from '@/components/MovieGrid';
import { EmptyState } from '@/components/EmptyState';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFavorites } from '@/hooks/useFavorites';
import { useWatchlist } from '@/hooks/useWatchlist';
import { motion } from 'framer-motion';

export default function Favorites() {
  const { favorites } = useFavorites();
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">My Collection</h1>

          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="favorites">
                Favorites ({favorites.length})
              </TabsTrigger>
              <TabsTrigger value="watchlist">
                Watchlist ({watchlist.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites">
              {favorites.length > 0 ? (
                <MovieGrid>
                  {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </MovieGrid>
              ) : (
                <EmptyState
                  title="No favorites yet"
                  description="Start adding movies to your favorites to see them here"
                />
              )}
            </TabsContent>

            <TabsContent value="watchlist">
              {watchlist.length > 0 ? (
                <MovieGrid>
                  {watchlist.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </MovieGrid>
              ) : (
                <EmptyState
                  title="No movies in watchlist"
                  description="Add movies to your watchlist to keep track of what you want to watch"
                />
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <ScrollToTop />
    </div>
  );
}
