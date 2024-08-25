import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies = () => {
  console.log('/movie/popular??');

  return api
    .get('/movie/popular')
    .then((res) => res.data)
    .catch((error) => {
      console.error('Fetching popular movies Error: ', error);
      throw error;
    });
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
    onError: (error) => {
      console.error('Error in usePopularMoviesQuery:', error);
    }
  });
};
