import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { MovieCard } from '@/components/MovieCard';
import { MovieGrid } from '@/components/MovieGrid';
import { SkeletonCard } from '@/components/SkeletonCard';
import { EmptyState } from '@/components/EmptyState';
import { ScrollToTop } from '@/components/ScrollToTop';
import { useSearchMovies, useSearchTV } from '@/hooks/useSearchMovies';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);
  const [filters, setFilters] = useState<{
    genre?: number;
    minRating?: number;
  }>({});

  const { data: moviesData, isLoading: moviesLoading } = useSearchMovies(searchQuery);
  const { data: tvData, isLoading: tvLoading } = useSearchTV(searchQuery);

  // Apply filters to results
  const filteredMovieResults = moviesData?.results.filter((movie) => {
    if (filters.genre && movie.genre_ids && !movie.genre_ids.includes(filters.genre)) {
      return false;
    }
    if (filters.minRating && movie.vote_average < filters.minRating) {
      return false;
    }
    return true;
  });

  const filteredTVResults = tvData?.results.filter((show) => {
    if (filters.genre && show.genre_ids && !show.genre_ids.includes(filters.genre)) {
      return false;
    }
    if (filters.minRating && show.vote_average < filters.minRating) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-6">Search</h1>
          <SearchBar onSearch={setSearchQuery} placeholder="Search for movies or TV series..." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FilterBar onFilterChange={setFilters} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Tabs defaultValue="movies">
            <TabsList className="mb-6">
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="tv">TV Series</TabsTrigger>
            </TabsList>

            <TabsContent value="movies">
              {moviesLoading ? (
                <MovieGrid>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </MovieGrid>
              ) : filteredMovieResults && filteredMovieResults.length > 0 ? (
                <>
                  <p className="text-muted-foreground mb-4">Found {filteredMovieResults.length} movies for "{searchQuery}"</p>
                  <MovieGrid>
                    {filteredMovieResults.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </MovieGrid>
                </>
              ) : (
                <EmptyState title="No movies found" description={`We couldn't find any movies matching "${searchQuery}"`} />
              )}
            </TabsContent>

            <TabsContent value="tv">
              {tvLoading ? (
                <MovieGrid>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </MovieGrid>
              ) : filteredTVResults && filteredTVResults.length > 0 ? (
                <>
                  <p className="text-muted-foreground mb-4">Found {filteredTVResults.length} series for "{searchQuery}"</p>
                  <MovieGrid>
                    {filteredTVResults.map((show) => (
                      <MovieCard key={show.id} movie={show as any} />
                    ))}
                  </MovieGrid>
                </>
              ) : (
                <EmptyState title="No series found" description={`We couldn't find any series matching "${searchQuery}"`} />
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <ScrollToTop />
    </div>
  );
}
