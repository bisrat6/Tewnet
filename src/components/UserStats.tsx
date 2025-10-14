import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Film, MessageSquare } from 'lucide-react';

interface UserStatsProps {
  totalRatings: number;
  totalReviews: number;
  averageRating: number;
}

export function UserStats({ totalRatings, totalReviews, averageRating }: UserStatsProps) {
  const stats = [
    {
      icon: Film,
      label: 'Movies Rated',
      value: totalRatings,
    },
    {
      icon: MessageSquare,
      label: 'Reviews Written',
      value: totalReviews,
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: averageRating.toFixed(1),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
