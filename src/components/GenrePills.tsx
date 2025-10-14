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
            className={`whitespace-nowrap rounded-full px-6 ${
              activeGenre === genre.id
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-card/50 border-border text-foreground hover:bg-secondary/20'
            }`}
          >
            {genre.name}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
