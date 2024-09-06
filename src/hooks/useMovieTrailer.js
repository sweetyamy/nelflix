import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieTrailer = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

export const useMovieTrailerQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-trailer', movieId],
    queryFn: () => fetchMovieTrailer(movieId),
    select: (videos) =>
      videos.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      ),
    staleTime: 300000
  });
};
