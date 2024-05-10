import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import filterMovie from "../../utils/FilterMovie";
import React from "react";
import {SCREEN_WIDTH_BIG, SCREEN_WIDTH_MEDIUM, CARD_ITEMS_SIZE_BIG, CARD_ITEMS_SIZE_REGULAR, CARD_ITEMS_SIZE_SMALL, SEC_DELAY} from '../../utils/constants';

function SavedMovies(props) {

  React.useEffect(() => {
    props.setServerError('');
  }, []);

  function getItemsCount() {
    if (window.innerWidth > SCREEN_WIDTH_BIG) {
      return CARD_ITEMS_SIZE_BIG;
    } else if (window.innerWidth > SCREEN_WIDTH_MEDIUM) {
      return CARD_ITEMS_SIZE_REGULAR;
    } else {
      return CARD_ITEMS_SIZE_SMALL;
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
      setTimeout(handleResize, SEC_DELAY);
    };

    window.addEventListener('resize', handleResizeWithTimeout);

    return () => {
      window.removeEventListener('resize', handleResizeWithTimeout);
    };
  }, []);

  const toggleShowMore = () => {
    setMaxItems(maxItems + plusItems);
  };

  const [filteredMovies, setFilteredMovies] = React.useState(props.movies);

  React.useEffect(() => {
    setFilteredMovies(props.movies);
    props.setLoading(false);
  }, [props.movies]);

  const handleSearch = (searchData, isShortChecked) => {
    if (searchData) {
      setFilteredMovies(filterMovie(props.movies, searchData, isShortChecked));
    } else {
      setFilteredMovies(props.movies);
    }
  };

  const handleCheckbox = (searchData, isShortChecked) => {
    setFilteredMovies(filterMovie(props.movies, searchData, isShortChecked));
  };

  React.useEffect(() => {
    props.setLoading(false);
  }, [filteredMovies]);

  return (
    <>
      <Header isLoggedIn={props.loggedIn}
        isThemeWhite={true}
        isMoviesActive={false}
        isSavedMoviesActive={true}
        isProfileActive={false} />
      <section className="saved-movies">
        <SearchForm onSearch={handleSearch} handleCheckbox={handleCheckbox} setLoading = {props.setLoading} serverError={props.serverError} setServerError={props.setServerError}/>
        {props.isLoading ? (
          <Preloader />
        ) : props.loadingError ? (
          <p className="preloader__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        ) : filteredMovies.length === 0 && !props.isLoading ? (
          <p className="preloader__text">Ничего не найдено</p>
        ) : (<>
          <MoviesCardList onSave={props.onSave} onDelete={props.onDelete} cardsList={filteredMovies.slice(0, Math.max(maxItems, maxItems)).map((movie) => { return { ...movie, isDelete: true } })}
            filteredMovies={filteredMovies} moviesType = {props.moviesType}/>
          {filteredMovies.length > maxItems && <button className="movies__more-btn" onClick={toggleShowMore}>Ещё</button>}
        </>)}
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies;