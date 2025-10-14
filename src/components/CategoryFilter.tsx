import { Button } from '@/components/ui/button';
import { Flame, Plus, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'popular', label: 'Popular', icon: Flame },
  { id: 'recent', label: 'Recently added', icon: Plus },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeCategory === category.id ? 'default' : 'ghost'}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-6 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
