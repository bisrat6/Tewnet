import { Badge } from '@/components/ui/badge';
import { Genre } from '@/types/movie';

interface GenreTagProps {
  genre: Genre;
}

export function GenreTag({ genre }: GenreTagProps) {
  return (
    <Badge variant="secondary" className="text-xs">
      {genre.name}
    </Badge>
  );
}
