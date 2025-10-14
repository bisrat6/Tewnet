// TMDB API Configuration
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  API_KEY: import.meta.env.VITE_TMDB_API_KEY || '',
  IMAGE_SIZES: {
    poster: {
      small: 'w185',
      medium: 'w342',
      large: 'w500',
      original: 'original',
    },
    backdrop: {
      small: 'w300',
      medium: 'w780',
      large: 'w1280',
      original: 'original',
    },
    profile: {
      small: 'w45',
      medium: 'w185',
      large: 'h632',
      original: 'original',
    },
  },
  ENDPOINTS: {
    popular: '/movie/popular',
    topRated: '/movie/top_rated',
    trending: '/trending/movie/week',
    nowPlaying: '/movie/now_playing',
    // TV
    tvPopular: '/tv/popular',
    tvTopRated: '/tv/top_rated',
    tvTrending: '/trending/tv/week',
    tvOnAir: '/tv/on_the_air',
    movieDetails: (id: number) => `/movie/${id}`,
    movieCredits: (id: number) => `/movie/${id}/credits`,
    similarMovies: (id: number) => `/movie/${id}/similar`,
    search: '/search/movie',
    tvDetails: (id: number) => `/tv/${id}`,
    tvCredits: (id: number) => `/tv/${id}/credits`,
    similarTV: (id: number) => `/tv/${id}/similar`,
    tvSearch: '/search/tv',
    genres: '/genre/movie/list',
    tvGenres: '/genre/tv/list',
    videos: (id: number) => `/movie/${id}/videos`,
    tvVideos: (id: number) => `/tv/${id}/videos`,
  },
};
