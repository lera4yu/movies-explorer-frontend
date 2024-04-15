import { checkRes } from "./constants";

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  };

  editProfile({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(checkRes);
  }

  //находим информацию о юзере через API
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET'
    }).then(checkRes).then((res) => (res.data));
  };

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
    }).then(checkRes).then((res) => (res.data));
  }

  saveMovie(movie) {
    const newMovie = {
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      director: movie.director,
      country: movie.country,
      year: movie.year,
      duration: movie.duration,
      description: movie.description,
      trailerLink: movie.trailerLink,
      image: movie.image,
      thumbnail: movie.image,
      movieId: movie.id
    }
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newMovie),
    }).then(checkRes).then((res) => (res.data));
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(checkRes).then((res) => (res.data));
  }
}

export default MainApi;