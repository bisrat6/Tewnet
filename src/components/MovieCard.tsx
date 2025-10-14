import { Movie, TVShow } from '@/types/movie';
import { getPosterUrl } from '@/utils/imageUrl';
import { Card } from '@/components/ui/card';
import { Star, Heart, Eye, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { useWatchlist } from '@/hooks/useWatchlist';
import { toast } from '@/hooks/use-toast';

type MediaItem = Movie | TVShow;
interface MovieCardProps { movie: MediaItem; }

export function MovieCard({ movie }: MovieCardProps) {
  const isTV = (movie as any).name !== undefined && (movie as any).title === undefined;
  const displayTitle = isTV ? (movie as TVShow).name : (movie as Movie).title;
  const year = isTV
    ? ((movie as TVShow).first_air_date ? new Date((movie as TVShow).first_air_date).getFullYear() : '')
    : ((movie as Movie).release_date ? new Date((movie as Movie).release_date).getFullYear() : '');
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie);
    toast({
      title: isInWatchlist(movie.id) ? 'Removed from Watchlist' : 'Added to Watchlist',
      description: isInWatchlist(movie.id)
        ? `${movie.title} removed from watchlist`
        : `${movie.title} added to watchlist`,
    });
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
    toast({
      title: isFavorite(movie.id) ? 'Removed from Favorites' : 'Added to Favorites',
      description: isFavorite(movie.id)
        ? `${movie.title} removed from favorites`
        : `${movie.title} added to favorites`,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="group"
    >
      <Link to={isTV ? `/tv/${movie.id}` : `/movie/${movie.id}`}>
        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all duration-300 cursor-pointer relative">
          <div className="aspect-[2/3] relative overflow-hidden">
            <img
              src={getPosterUrl(movie.poster_path, 'medium')}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== '/placeholder.svg') target.src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating Bookmark Button */}
            <Button
              size="icon"
              variant={isInWatchlist(movie.id) ? "default" : "secondary"}
              className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={handleWatchlistToggle}
            >
              <Bookmark className={`w-4 h-4 ${isInWatchlist(movie.id) ? 'fill-current' : ''}`} />
            </Button>

            {/* Rating Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                {isTV ? 'TV' : 'HD'}
              </Badge>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {movie.vote_count}
                </span>
                <span>{year}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-sm line-clamp-1 mb-2">{displayTitle}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
              </div>
              <Heart 
                className={`w-4 h-4 transition-colors cursor-pointer ${
                  isFavorite(movie.id) ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={handleFavoriteToggle}
              />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
