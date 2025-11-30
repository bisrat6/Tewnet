import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TMDB_CONFIG } from '@/config/tmdb';
import { MovieDetails, Credits, Video, TVDetails } from '@/types/movie';

async function fetchMovieDetails(movieId: number): Promise<MovieDetails> {
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error('TMDB API key is not configured');
    }
    const { data } = await axios.get(
      `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.movieDetails(movieId)}`,
      {
        params: { api_key: TMDB_CONFIG.API_KEY },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Movie not found.');
      }
      throw new Error(error.response?.data?.status_message || 'Failed to fetch movie details.');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred.');
  }
}

async function fetchMovieCredits(movieId: number): Promise<Credits> {
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error('TMDB API key is not configured');
    }
    const { data } = await axios.get(
      `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.movieCredits(movieId)}`,
      {
        params: { api_key: TMDB_CONFIG.API_KEY },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.status_message || 'Failed to fetch movie credits.');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred.');
  }
}

async function fetchMovieVideos(movieId: number): Promise<Video[]> {
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error('TMDB API key is not configured');
    }
    const { data } = await axios.get(
      `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.videos(movieId)}`,
      {
        params: { api_key: TMDB_CONFIG.API_KEY },
      }
    );
    return data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.status_message || 'Failed to fetch videos.');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred.');
  }
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
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error('TMDB API key is not configured');
    }
    const { data } = await axios.get(
      `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvDetails(tvId)}`,
      { params: { api_key: TMDB_CONFIG.API_KEY } }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('TV show not found.');
      }
      throw new Error(error.response?.data?.status_message || 'Failed to fetch TV show details.');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred.');
  }
}

async function fetchTVCredits(tvId: number): Promise<Credits> {
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error('TMDB API key is not configured');
    }
    const { data } = await axios.get(
      `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvCredits(tvId)}`,
      { params: { api_key: TMDB_CONFIG.API_KEY } }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.status_message || 'Failed to fetch TV show credits.');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred.');
  }
}

async function fetchTVVideos(tvId: number): Promise<Video[]> {
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error('TMDB API key is not configured');
    }
    const { data } = await axios.get(
      `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvVideos(tvId)}`,
      { params: { api_key: TMDB_CONFIG.API_KEY } }
    );
    return data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.status_message || 'Failed to fetch videos.');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred.');
  }
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
