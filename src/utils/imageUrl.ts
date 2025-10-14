import { TMDB_CONFIG } from '@/config/tmdb';

export function getPosterUrl(path: string | null, size: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!path) return '/placeholder.svg';
  const sizeValue = TMDB_CONFIG.IMAGE_SIZES.poster[size];
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${sizeValue}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'small' | 'medium' | 'large' | 'original' = 'large'): string {
  if (!path) return '/placeholder.svg';
  const sizeValue = TMDB_CONFIG.IMAGE_SIZES.backdrop[size];
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${sizeValue}${path}`;
}

export function getProfileUrl(path: string | null, size: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!path) return '/placeholder.svg';
  const sizeValue = TMDB_CONFIG.IMAGE_SIZES.profile[size];
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${sizeValue}${path}`;
}
