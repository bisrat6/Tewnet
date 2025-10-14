import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Movie, TVShow } from '@/types/movie';
import { getBackdropUrl } from '@/utils/imageUrl';
import { Link } from 'react-router-dom';
import { Star, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from '@/hooks/use-toast';

import 'swiper/css';
import 'swiper/css/pagination';

interface TrendingCarouselProps { movies: Array<Movie | TVShow>; }

export function TrendingCarousel({ movies }: TrendingCarouselProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteToggle = (movie: Movie, e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(movie);
    toast({
      title: isFavorite(movie.id) ? 'Removed from Favorites' : 'Added to Favorites',
      description: isFavorite(movie.id)
        ? `${movie.title} removed from favorites`
        : `${movie.title} added to favorites`,
    });
  };

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="w-full h-[500px] md:h-[700px] overflow-hidden -mt-20"
    >
      {movies.map((movie) => {
        const isTV = (movie as any).name !== undefined && (movie as any).title === undefined;
        const title = isTV ? (movie as TVShow).name : (movie as Movie).title;
        const to = isTV ? `/tv/${movie.id}` : `/movie/${movie.id}`;
        return (
        <SwiperSlide key={movie.id}>
          <div className="relative w-full h-full">
            <img
              src={getBackdropUrl(movie.backdrop_path, 'original')}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== '/placeholder.svg') target.src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute bottom-[10%] md:bottom-[15%] left-0 right-0 px-8 md:px-16 max-w-2xl"
            >
              <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-tight">{title}</h1>
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(movie.vote_average / 2)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold">{movie.vote_average.toFixed(1)}</span>
              </div>
              <p className="text-base md:text-lg line-clamp-3 mb-8 text-muted-foreground max-w-xl">
                {movie.overview}
              </p>
              <div className="flex items-center gap-4">
                <Link to={to}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 py-6 text-lg rounded-full">
                    <Eye className="w-5 h-5" />
                    View Details
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 px-8 py-6 text-lg rounded-full border-2"
                  onClick={(e) => handleFavoriteToggle(movie, e)}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
                  {isFavorite(movie.id) ? 'Remove from Favourites' : 'Add to Favourites'}
                </Button>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
