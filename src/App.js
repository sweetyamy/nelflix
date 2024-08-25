import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout.jsx';
import Homepage from './pages/Homepage/Homepage.jsx';
import MovieList from './pages/MovieList/MovieList.jsx';
import MovieDetail from './pages/MovieDetail/MovieDetail.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

// homepage   '/'
// movie list page   '/movies'
// movie detail page   '/movies/:id'
// movie reviews page   '/movies/:id/reviews'
// movie recommendations page   '/movies/:id/recommendations'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path='/movies'>
          <Route index element={<MovieList />} />
          <Route path=':id' element={<MovieDetail />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
