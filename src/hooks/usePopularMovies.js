import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies = async () => {
  try {
    const res = await api.get('/movie/popular');
    console.log('API response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Fetching popular movies Error: ', error);
    throw error;
  }
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
    select: (data) => data.results,
    onError: (error) => {
      console.error('Error in usePopularMoviesQuery:', error);
    }
  });
};
