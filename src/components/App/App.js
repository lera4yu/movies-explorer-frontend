import React from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { Route, Routes } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import MainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CONFLICT_ERROR, UNAUTHORIZED_ERROR } from '../../utils/constants';

function App() {

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [loadingError, setLoadingError] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });

  const navigate = useNavigate();

  const [movies, setMovies] = React.useState([]);

  const [filteredMovies, setFilteredMovies] = React.useState(movies);

  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isLoading, setLoading] = React.useState(false);

  const [isLoadingMovie, setLoadingMovie] = React.useState(false);

  const [serverError, setServerError] = React.useState('');

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/movies');
        }
        else {
          setLoggedIn(false);
          navigate('/signin', { replace: true })
        }
      });
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  const mainApi = new MainApi({
    url: 'https://api.kinomovies.nomoredomainswork.ru',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  });

  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) =>
          console.log(`Получение информации о пользователе привело к ошибке ${err}`)
        )
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      setLoadingError(false);
      setLoadingMovie(true);
      const moviesPromise = moviesApi.getMovies();
      const savedMoviesPromise = mainApi.getSavedMovies();

      Promise.all([moviesPromise, savedMoviesPromise]).then(([movies, savedMovies]) => {
        setSavedMovies(savedMovies);
        const moviesWithSavedFlag = movies.map((movie) => {
          const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
          return {
            ...movie,
            isSaved: isSaved
          };
        })
        setMovies(moviesWithSavedFlag);
        setFilteredMovies(moviesWithSavedFlag);
      })
        .catch((err) => {
          console.log(`Получение информации о фильмах привело к ошибке ${err}`);
          setLoadingError(true);
        })
        .finally((res) => setLoadingMovie(false));
    }
  }, [isLoggedIn]);

  function handleRegister(name, email, password) {
    setLoading(true);
    auth.register(name, email, password)
      .then((res) => {
        if (res) {
          setServerError('');
          navigate('/signin', { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Попытка регистрации привела к ошибке ${err}`);
        if (err === CONFLICT_ERROR) {
          setServerError('Пользователь с таким email уже существует.');
        } else {
          setServerError('При регистрации пользователя произошла ошибка.');
        }
      })
      .finally((res) => setLoading(false));
  }

  function handleLogin(email, password) {
    setLoading(true);
    auth.authorize(email, password)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        setServerError('');
      })
      .catch(err => {
        console.log(`Попытка входа привела к ошибке ${err}`);
        if (err === UNAUTHORIZED_ERROR) {
          setServerError('Вы ввели неправильный логин или пароль.');
        } else {
          setServerError('При авторизации произошла ошибка. Токен не передан или передан некорректно.')
        }
      })
      .finally((res) => setLoading(false));
  }

  function handleEdit(userInfo) {
    setLoading(true);
    return mainApi.editProfile(userInfo)
      .then((res) => {
        setCurrentUser({ name: res.data.name, email: res.data.email });
        setServerError('');
      })
      .catch((err) => {
        console.log(`Обновление данных пользователя привело к ошибке ${err}`);
        if (err === CONFLICT_ERROR) {
          setServerError('Пользователь с таким email уже существует.');
        } else {
          setServerError('При обновлении профиля произошла ошибка.');
        }
      })
      .finally((res) => setLoading(false));
  }

  function handleMovieSave(movie) {
    mainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        setFilteredMovies(updateSaveData(filteredMovies, res));
        setMovies(updateSaveData(movies, res));
      })
  }

  function updateSaveData(movieArray, movie) {
    return movieArray.map((movieCard) => {
      if (movieCard.id === movie.movieId) {
        return {
          ...movieCard,
          isSaved: true
        }
      } else {
        return movieCard;
      }
    });
  }

  function handleMovieDelete(movie, moviesType) {
    let movieDeleteId;
    if (moviesType === 'saved') {
      movieDeleteId = savedMovies.find((movieCard) => movieCard.movieId === movie.movieId)._id;
    } else {
      movieDeleteId = savedMovies.find((movieCard) => movieCard.movieId === movie.id)._id;
    }
    mainApi.deleteMovie(movieDeleteId)
      .then((res) => {
        if (moviesType === 'saved') {
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.movieId));
        } else {
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.id));
        }
        setFilteredMovies(updateDeleteData(filteredMovies, movie));
        setMovies(updateDeleteData(movies, movie));
      })
      .catch((err) => {
        console.log(`Удаление фильма привело к ошибке ${err}`);
      });
  }

  function updateDeleteData(movieArray, movie) {
    return movieArray.map((m) => {
      if (m.id === movie.id) {
        return {
          ...m,
          isSaved: false
        }
      } else {
        return m;
      }
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            <Route path="/movies" element={<ProtectedRouteElement element={Movies} setMovies={setMovies} loggedIn={isLoggedIn} movies={movies}
              isLoading={isLoadingMovie} setLoading={setLoadingMovie} loadingError={loadingError}
              setLoadingError={setLoadingError} onSave={handleMovieSave} onDelete={handleMovieDelete}
              filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} moviesType="initial" />} />
            <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} setMovies={setSavedMovies}
              movies={savedMovies} isLoading={isLoadingMovie} setLoading={setLoadingMovie} loadingError={loadingError}
              setLoadingError={setLoadingError} onSave={handleMovieSave} loggedIn={isLoggedIn} onDelete={handleMovieDelete}
              filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} moviesType="saved" />} />
            <Route path="/signin" element={<Login handleLogin={handleLogin} isLoading={isLoading} serverError={serverError} setServerError={setServerError} />} />
            <Route path="/signup" element={<Register onRegister={handleRegister} isLoading={isLoading} serverError={serverError} setServerError={setServerError} />} />
            <Route path="/profile" element={<ProtectedRouteElement element={Profile} isLoading={isLoading} loggedIn={isLoggedIn} setLoggedIn={setLoggedIn}
              currentUser={currentUser} setCurrentUser={setCurrentUser} onEdit={handleEdit} serverError={serverError} setServerError={setServerError} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>);
};

export default App;
