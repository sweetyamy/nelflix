import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopMovies = async (language) => {
  try {
    const res = await api.get('/movie/top_rated', {
      params: {
        language
      }
    });
    console.log('API response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Fetching top rated movies Error: ', error);
    throw error;
  }
};

export const useTopMoviesQuery = (language = 'en') => {
  return useQuery({
    queryKey: ['top-movies', language],
    queryFn: () => fetchTopMovies(language),
    select: (data) => data.results,
    onError: (error) => {
      console.error('Error in useTopMoviesQuery:', error);
    }
  });
};
