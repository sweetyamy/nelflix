import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchUpcomingMovies = async () => {
  try {
    const res = await api.get('/movie/upcoming');
    console.log('API response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Fetching upcoming movies Error: ', error);
    throw error;
  }
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpcomingMovies,
    select: (data) => data.results,
    onError: (error) => {
      console.error('Error in useUpcomingMoviesQuery:', error);
    }
  });
};
