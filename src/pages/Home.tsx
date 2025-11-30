import { Navbar } from '@/components/Navbar';
import { TrendingCarousel } from '@/components/TrendingCarousel';
import { MovieSection } from '@/components/MovieSection';
import { CategoryFilter } from '@/components/CategoryFilter';
import { GenrePills } from '@/components/GenrePills';
import { SkeletonCard } from '@/components/SkeletonCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorState } from '@/components/ErrorState';
import { ScrollToTop } from '@/components/ScrollToTop';
import { usePopularMovies, useTopRatedMovies, useTrendingMovies, useNowPlayingMovies, usePopularTV, useTopRatedTV, useTrendingTV, useOnAirTV } from '@/hooks/useMovies';
import { useGenres } from '@/hooks/useGenres';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [pages, setPages] = useState({ trending: 1, popular: 1, topRated: 1, recent: 1 });
  const [activeType, setActiveType] = useState<'movie' | 'tv'>('movie');
  const { data: trendingData, isLoading: trendingLoading, error: trendingError, refetch: refetchTrending } = activeType === 'movie' ? useTrendingMovies(pages.trending) : useTrendingTV(pages.trending);
  const { data: popularData, isLoading: popularLoading, error: popularError, refetch: refetchPopular } = activeType === 'movie' ? usePopularMovies(pages.popular) : usePopularTV(pages.popular);
  const { data: topRatedData, isLoading: topRatedLoading, error: topRatedError, refetch: refetchTopRated } = activeType === 'movie' ? useTopRatedMovies(pages.topRated) : useTopRatedTV(pages.topRated);
  const { data: nowPlayingData, isLoading: nowPlayingLoading, error: nowPlayingError, refetch: refetchNowPlaying } = activeType === 'movie' ? useNowPlayingMovies(pages.recent) : useOnAirTV(pages.recent);
  const { data: genres } = useGenres(activeType);
  const { data: searchData, isLoading: searchLoading, error: searchError, refetch: refetchSearch } = useSearchMovies(searchQuery);
  
  const [activeCategory, setActiveCategory] = useState('trending');
  const [activeGenre, setActiveGenre] = useState<number | null>(null);

  const loadMore = () => {
    setPages((p) => {
      if (activeCategory === 'trending') return { ...p, trending: p.trending + 1 };
      if (activeCategory === 'popular') return { ...p, popular: p.popular + 1 };
      if (activeCategory === 'top-rated') return { ...p, topRated: p.topRated + 1 };
      return { ...p, recent: p.recent + 1 };
    });
  };

  const currentMovies = useMemo(() => {
    const byGenre = (list: any[] | undefined) =>
      activeGenre ? (list || []).filter((m) => m.genre_ids?.includes(activeGenre)) : (list || []);
    if (activeCategory === 'trending') return byGenre(trendingData?.results);
    if (activeCategory === 'popular') return byGenre(popularData?.results);
    if (activeCategory === 'top-rated') return byGenre(topRatedData?.results);
    return byGenre(nowPlayingData?.results);
  }, [activeCategory, activeGenre, trendingData, popularData, topRatedData, nowPlayingData]);

  const handleClearSearch = () => {
    setSearchParams({});
  };

  // Filter search results by active genre if selected
  const filteredSearchResults = searchData?.results.filter((movie) => {
    if (activeGenre && movie.genre_ids && !movie.genre_ids.includes(activeGenre)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Carousel */}
        {trendingLoading ? (
          <div className="h-[500px] md:h-[700px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : trendingError ? (
          <div className="h-[500px] md:h-[700px] flex items-center justify-center px-4">
            <ErrorState 
              title="Failed to load trending content"
              message={trendingError instanceof Error ? trendingError.message : 'Unable to load trending movies. Please try again.'}
              onRetry={() => refetchTrending()}
            />
          </div>
        ) : trendingData?.results && trendingData.results.length > 0 ? (
          <TrendingCarousel movies={trendingData.results.slice(0, 5)} />
        ) : null}

        <div className="container mx-auto px-6 py-12">
          {/* Search Results Section */}
          {searchQuery && (
            <div id="search-results" className="mb-12 scroll-mt-20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Search Results</h2>
                  <p className="text-muted-foreground">
                    Found {filteredSearchResults?.length || 0} results for "{searchQuery}"
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearSearch}
                  className="gap-2"
                >
                  Clear Search
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {searchLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : searchError ? (
                <ErrorState 
                  title="Search failed"
                  message={searchError instanceof Error ? searchError.message : 'Unable to search movies. Please try again.'}
                  onRetry={() => refetchSearch()}
                />
              ) : filteredSearchResults && filteredSearchResults.length > 0 ? (
                <MovieSection title="" movies={filteredSearchResults} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No movies found matching your search.</p>
                </div>
              )}
            </div>
          )}

          {/* Recommendation Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recommendation</h2>
            <div className="mb-4 flex gap-2">
              <Button variant={activeType === 'movie' ? 'default' : 'outline'} size="sm" onClick={() => setActiveType('movie')}>Movies</Button>
              <Button variant={activeType === 'tv' ? 'default' : 'outline'} size="sm" onClick={() => setActiveType('tv')}>TV Series</Button>
            </div>
            
            {/* Category Filters */}
            <div className="mb-6">
              <CategoryFilter 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
            </div>

            {/* Genre Pills */}
            {genres && genres.length > 0 && (
              <GenrePills 
                genres={genres.slice(0, 8)} 
                activeGenre={activeGenre}
                onGenreChange={setActiveGenre}
              />
            )}
          </div>

          {/* Dynamic Movie Section based on Category */}
          {(activeCategory === 'trending' && trendingLoading) ||
           (activeCategory === 'popular' && popularLoading) ||
           (activeCategory === 'top-rated' && topRatedLoading) ||
           (activeCategory === 'recent' && nowPlayingLoading) ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-12">
              {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (activeCategory === 'trending' && trendingError) ? (
            <ErrorState 
              title="Failed to load trending content"
              message={trendingError instanceof Error ? trendingError.message : 'Unable to load trending movies.'}
              onRetry={() => refetchTrending()}
            />
          ) : (activeCategory === 'popular' && popularError) ? (
            <ErrorState 
              title="Failed to load popular content"
              message={popularError instanceof Error ? popularError.message : 'Unable to load popular movies.'}
              onRetry={() => refetchPopular()}
            />
          ) : (activeCategory === 'top-rated' && topRatedError) ? (
            <ErrorState 
              title="Failed to load top rated content"
              message={topRatedError instanceof Error ? topRatedError.message : 'Unable to load top rated movies.'}
              onRetry={() => refetchTopRated()}
            />
          ) : (activeCategory === 'recent' && nowPlayingError) ? (
            <ErrorState 
              title="Failed to load recent content"
              message={nowPlayingError instanceof Error ? nowPlayingError.message : 'Unable to load recent movies.'}
              onRetry={() => refetchNowPlaying()}
            />
          ) : (
            <>
              <MovieSection 
                title={
                  activeCategory === 'trending'
                    ? (activeType === 'movie' ? 'Trending Movies' : 'Trending Series')
                    : activeCategory === 'popular'
                    ? (activeType === 'movie' ? 'Popular Movies' : 'Popular Series')
                    : activeCategory === 'top-rated'
                    ? (activeType === 'movie' ? 'Top Rated Movies' : 'Top Rated Series')
                    : (activeType === 'movie' ? 'Recently Added Movies' : 'On Air')
                }
                movies={currentMovies}
              />
              {currentMovies && currentMovies.length > 0 && (
                <div className="flex justify-center mt-6">
                  <Button onClick={loadMore} variant="outline">Load more</Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
}
