import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GenrePillsProps {
  genres: Array<{ id: number; name: string }>;
  activeGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
}

export function GenrePills({ genres, activeGenre, onGenreChange }: GenrePillsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {genres.map((genre) => (
        <motion.div key={genre.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={activeGenre === genre.id ? 'default' : 'outline'}
            onClick={() => onGenreChange(activeGenre === genre.id ? null : genre.id)}
            className={`whitespace-nowrap rounded-full px-6 transition-all ${
              activeGenre === genre.id
                ? 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg shadow-secondary/20'
                : 'bg-gradient-to-r from-card/50 to-card/30 border-border text-foreground hover:from-secondary/20 hover:to-secondary/10'
            }`}
          >
            {genre.name}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
