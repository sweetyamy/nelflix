// useMovieDetailsQuery.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Movie details Error:', error);
    throw error;
  }
};

export const useMovieDetailsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    staleTime: 300000
  });
};
