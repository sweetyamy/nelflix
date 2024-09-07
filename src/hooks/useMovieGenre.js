import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieGenre = async (language) => {
  return api.get(`/genre/movie/list`, {
    params: {
      language
    }
  });
};

export const useMovieGenreQuery = (language = 'en') => {
  return useQuery({
    queryKey: ['movie-genre', language],
    queryFn: () => fetchMovieGenre(language),
    select: (result) => result.data.genres,
    staleTime: 300000 // 3 minutes
  });
};
