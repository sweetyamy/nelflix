import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchMovie = ({ keyword, page }) => {
  return keyword
    ? api.get(`/search/movie?page=${page}`, { params: { query: keyword } })
    : api.get(`/movie/popular?page=${page}`, {
        params: { page, per_page: 10 }
      });
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page }],
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result.data
  });
};
