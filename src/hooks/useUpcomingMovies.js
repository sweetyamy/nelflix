import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchUpcomingMovies = async (language) => {
  try {
    const res = await api.get('/movie/upcoming', {
      params: {
        language
      }
    });
    console.log('API response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Fetching upcoming movies Error: ', error);
    throw error;
  }
};

export const useUpcomingMoviesQuery = (language = 'en') => {
  return useQuery({
    queryKey: ['upcoming-movies', language],
    queryFn: () => fetchUpcomingMovies(language),
    select: (data) => data.results,
    onError: (error) => {
      console.error('Error in useUpcomingMoviesQuery:', error);
    }
  });
};
