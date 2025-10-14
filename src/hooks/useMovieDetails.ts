import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TMDB_CONFIG } from '@/config/tmdb';
import { MovieDetails, Credits, Video, TVDetails } from '@/types/movie';

async function fetchMovieDetails(movieId: number): Promise<MovieDetails> {
  const { data } = await axios.get(
    `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.movieDetails(movieId)}`,
    {
      params: { api_key: TMDB_CONFIG.API_KEY },
    }
  );
  return data;
}

async function fetchMovieCredits(movieId: number): Promise<Credits> {
  const { data } = await axios.get(
    `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.movieCredits(movieId)}`,
    {
      params: { api_key: TMDB_CONFIG.API_KEY },
    }
  );
  return data;
}

async function fetchMovieVideos(movieId: number): Promise<Video[]> {
  const { data } = await axios.get(
    `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.videos(movieId)}`,
    {
      params: { api_key: TMDB_CONFIG.API_KEY },
    }
  );
  return data.results;
}

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useMovieCredits(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => fetchMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useMovieVideos(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => fetchMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

async function fetchTVDetails(tvId: number): Promise<TVDetails> {
  const { data } = await axios.get(
    `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvDetails(tvId)}`,
    { params: { api_key: TMDB_CONFIG.API_KEY } }
  );
  return data;
}

async function fetchTVCredits(tvId: number): Promise<Credits> {
  const { data } = await axios.get(
    `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvCredits(tvId)}`,
    { params: { api_key: TMDB_CONFIG.API_KEY } }
  );
  return data;
}

async function fetchTVVideos(tvId: number): Promise<Video[]> {
  const { data } = await axios.get(
    `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvVideos(tvId)}`,
    { params: { api_key: TMDB_CONFIG.API_KEY } }
  );
  return data.results;
}

export function useTVDetails(tvId: number) {
  return useQuery({
    queryKey: ['tv', tvId],
    queryFn: () => fetchTVDetails(tvId),
    enabled: !!tvId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useTVCredits(tvId: number) {
  return useQuery({
    queryKey: ['tv', tvId, 'credits'],
    queryFn: () => fetchTVCredits(tvId),
    enabled: !!tvId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useTVVideos(tvId: number) {
  return useQuery({
    queryKey: ['tv', tvId, 'videos'],
    queryFn: () => fetchTVVideos(tvId),
    enabled: !!tvId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
