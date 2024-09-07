import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies = async (language) => {
  try {
    const res = await api.get('/movie/popular', {
      params: {
        language
      }
    });
    console.log('API response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Fetching popular movies Error: ', error);
    throw error;
  }
};

export const usePopularMoviesQuery = (language = 'en') => {
  return useQuery({
    queryKey: ['popular-movies', language],
    queryFn: () => fetchPopularMovies(language),
    select: (data) => data.results,
    onError: (error) => {
      console.error('Error in usePopularMoviesQuery:', error);
    }
  });
};
