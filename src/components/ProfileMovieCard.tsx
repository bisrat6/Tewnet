import { Movie, TVShow } from '@/types/movie';
import { getPosterUrl } from '@/utils/imageUrl';
import { Card } from '@/components/ui/card';
import { Star, Eye, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type MediaItem = Movie | TVShow | (Movie & { name?: string }) | (TVShow & { title?: string });
interface ProfileMovieCardProps {
  movie: MediaItem;
  onDelete: (movieId: number) => void;
  category: 'favorites' | 'watchlist' | 'rated' | 'reviewed';
}

export function ProfileMovieCard({ movie, onDelete, category }: ProfileMovieCardProps) {
  const isTV = (movie as any).name !== undefined && (movie as any).title === undefined;
  const displayTitle = isTV ? (movie as TVShow).name : (movie as Movie).title;
  const year = isTV
    ? ((movie as TVShow).first_air_date ? new Date((movie as TVShow).first_air_date).getFullYear() : '')
    : ((movie as Movie).release_date ? new Date((movie as Movie).release_date).getFullYear() : '');
  
  const getCategoryLabel = () => {
    switch (category) {
      case 'favorites':
        return 'favorites';
      case 'watchlist':
        return 'watchlist';
      case 'rated':
        return 'rated movies';
      case 'reviewed':
        return 'reviewed movies';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="group relative"
    >
      <Link to={isTV ? `/tv/${movie.id}` : `/movie/${movie.id}`}>
        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all duration-300 cursor-pointer">
          <div className="aspect-[2/3] relative overflow-hidden">
            <img
              src={getPosterUrl(movie.poster_path, 'medium')}
              alt={displayTitle}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Delete Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-3 left-3 rounded-full bg-destructive/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove from {getCategoryLabel()}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove "{displayTitle}" from your {getCategoryLabel()}?
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(movie.id);
                    }}
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Rating Badge */}
            <div className="absolute top-3 right-3">
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
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
