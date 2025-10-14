import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useGenres } from '@/hooks/useGenres';

interface FilterBarProps {
  onFilterChange: (filters: { genre?: number; minRating?: number }) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const { data: genres } = useGenres();
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    onFilterChange({
      genre: value === 'all' ? undefined : parseInt(value),
      minRating: minRating || undefined,
    });
  };

  const handleRatingChange = (value: number[]) => {
    setMinRating(value[0]);
    onFilterChange({
      genre: selectedGenre === 'all' ? undefined : parseInt(selectedGenre),
      minRating: value[0] || undefined,
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            {isOpen ? 'Hide' : 'Show'} Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="animate-accordion-down">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-card rounded-lg border">
          <div className="space-y-2">
            <Label>Genre</Label>
            <Select value={selectedGenre} onValueChange={handleGenreChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres?.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Min Rating: {minRating.toFixed(1)}</Label>
            <Slider
              value={[minRating]}
              onValueChange={handleRatingChange}
              min={0}
              max={10}
              step={0.5}
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
