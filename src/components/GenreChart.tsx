import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GenreChartProps {
  data: { genre: string; count: number }[];
}

export function GenreChart({ data }: GenreChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Rated Genres</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="genre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-center py-12">
            No rating data available yet. Start rating movies to see your top genres!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
