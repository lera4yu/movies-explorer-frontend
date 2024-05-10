import {SHORT_MOVIE_DURATION} from './constants';

export default function filterMovie(initialMovies, selector, isShortChecked) {

  let filterMovies = [...initialMovies];

  if (!filterMovies) {
    return [];
  }

  const filterName = (movieName) => {
    return filterMovies.filter((movie) => movie[movieName]
      .toLowerCase()
      .includes(selector.toLowerCase()));
  }

  if (selector) {
    if (filterName('nameRU')) {
      filterMovies = filterName('nameRU');
    } else {
      filterMovies = filterName('nameEN');
    }
  }

  if (isShortChecked) {
    return filterMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
  } else {
    return filterMovies;
  }
}