import React from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { Route, Routes } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {

  const isLoggedIn = true;

  return (
    <div className="page">
      <div className="page__container">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Movies-Explorer</title>
        <meta
          name="description"
          content="Интерактивная страница с поисковиком понравившихся фильмов"
        />
        <meta name="keywords" content="Фильмы, поисковик" />
        <meta name="author" content="Валерия Юдина" />
        <Routes>
          <Route path="/" element={<Main loggedIn={isLoggedIn} />} />
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} loggedIn={isLoggedIn} />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} loggedIn={isLoggedIn} />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} loggedIn={isLoggedIn} name={"Виталий"} email={"pochta@yandex.ru"} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>);
};

export default App;
