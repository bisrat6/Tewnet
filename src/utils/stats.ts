import { UserRating } from '@/types/movie';
import { Genre } from '@/types/movie';

export interface UserStats {
  totalRatings: number;
  totalReviews: number;
  averageRating: number;
  topGenres: { genre: string; count: number }[];
}

export function calculateUserStats(
  ratings: Record<number, number>,
  reviews: Record<number, string>,
  movies: any[] = []
): UserStats {
  const ratingsArray = Object.values(ratings);
  const totalRatings = ratingsArray.length;
  const totalReviews = Object.keys(reviews).length;
  const averageRating = totalRatings > 0
    ? ratingsArray.reduce((sum, rating) => sum + rating, 0) / totalRatings
    : 0;

  // Calculate top genres from rated movies
  const genreCounts: Record<string, number> = {};
  
  movies.forEach(movie => {
    if (ratings[movie.id] && movie.genres) {
      movie.genres.forEach((genre: Genre) => {
        genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
      });
    }
  });

  const topGenres = Object.entries(genreCounts)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalRatings,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    topGenres,
  };
}
