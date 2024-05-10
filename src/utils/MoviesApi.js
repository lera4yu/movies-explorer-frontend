import { checkRes } from "./constants";

class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  };

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      headers:
        this._headers,
    }).then(checkRes)
      .then((res) => { return res.map((movie) => {return { ...movie, image: this._url + movie.image.url}})
  });
}
}

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co',
  headers: { 'Content-Type': 'application/json' },
});

export { checkRes };
