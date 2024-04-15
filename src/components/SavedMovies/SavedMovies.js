import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import filterMovie from "../../utils/FilterMovie";
import React from "react";

function SavedMovies(props) {
  function getItemsCount() {
    if (window.innerWidth >= 950) {
      return [12, 3];
    } else if (window.innerWidth >= 650) {
      return [8, 2];
    } else {
      return [5, 2];
    }
  }

  const [maxItemsInitialCount, plusItemsInitialCount] = getItemsCount();

  const [maxItems, setMaxItems] = React.useState(maxItemsInitialCount);
  const [plusItems, setPlusItems] = React.useState(plusItemsInitialCount);

  function handleResize() {
    const [maxItemsCount, plusItemsCount] = getItemsCount();
    setMaxItems(maxItemsCount);
    setPlusItems(plusItemsCount);
  }

  React.useEffect(() => {

    const handleResizeWithTimeout = () => {
      setTimeout(handleResize, 250);
    };

    window.addEventListener('resize', handleResizeWithTimeout);

    return () => {
      window.removeEventListener('resize', handleResizeWithTimeout);
    };
  }, []);

  const [shownItems, setShownItems] = React.useState(maxItems);

  const toggleShowMore = () => {
    setShownItems(shownItems + plusItems);
  };

  const [filteredMovies, setFilteredMovies] = React.useState(props.movies);

  React.useEffect(() => {
    setFilteredMovies(props.movies);
    props.setLoading(false);
  }, [props.movies]);

  const handleSearch = (searchData, isShortChecked) => {
    props.setLoading(true);
    if (searchData) {
      setFilteredMovies(filterMovie(props.movies, searchData, isShortChecked));
    } else {
      setFilteredMovies(props.movies);
    }
    props.setLoading(false);
  };

  const handleCheckbox = (searchData, isShortChecked) => {
    setFilteredMovies(filterMovie(props.movies, searchData, isShortChecked));
  };

  return (
    <>
      <Header isLoggedIn={props.loggedIn}
        isThemeWhite={true}
        isMoviesActive={false}
        isSavedMoviesActive={true}
        isProfileActive={false} />
      <section className="saved-movies">
        <SearchForm onSearch={handleSearch} handleCheckbox={handleCheckbox} />
        {props.isLoading ? (
          <Preloader />
        ) : props.loadingError ? (
          <p className="preloader__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        ) : filteredMovies.length === 0 && !props.isLoading ? (
          <p className="preloader__text">Ничего не найдено</p>
        ) : (<>
          <MoviesCardList onSave={props.onSave} onDelete={props.onDelete} cardsList={filteredMovies.slice(0, Math.max(shownItems, maxItems)).map((movie) => { return { ...movie, isDelete: true } })}
            filteredMovies={filteredMovies} moviesType = {props.moviesType}/>
          {filteredMovies.length > shownItems && <button className="movies__more-btn" onClick={toggleShowMore}>Ещё</button>}
        </>)}
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies;