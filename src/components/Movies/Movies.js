import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import filterMovie from "../../utils/FilterMovie";
import Preloader from "./Preloader/Preloader";
import React from "react";
import { useLocation } from "react-router-dom";

function Movies(props) {

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

  const [filteredMovies, setFilteredMovies] = [props.filteredMovies, props.setFilteredMovies];

  React.useEffect(() => {
    const savedFilteredMovies = localStorage.getItem("filteredMovies");
    const savedInputValue = localStorage.getItem("selector");
    const savedShortChecked = localStorage.getItem("isShortChecked");
    if (savedFilteredMovies && (savedInputValue || savedShortChecked)) {
      
      setFilteredMovies(JSON.parse(savedFilteredMovies));
    } else {
      setFilteredMovies(props.movies);
    }
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

  React.useEffect(() => {
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
  }, [filteredMovies]);


  return (
    <>
      <Header isLoggedIn={props.loggedIn}
        isThemeWhite={true}
        isMoviesActive={true}
        isSavedMoviesActive={false}
        isProfileActive={false} />
      <section className="movies">
        <SearchForm onSearch={handleSearch} handleCheckbox={handleCheckbox} />
        {props.isLoading ? (
          <Preloader />
        ) : props.loadingError ? (
          <p className="preloader__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        ) : filteredMovies.length === 0 && !props.isLoading ? (
          <p className="preloader__text">Ничего не найдено</p>
        ) : (<>
          <MoviesCardList onDelete={props.onDelete} onSave={props.onSave}
            cardsList={filteredMovies.slice(0, Math.max(shownItems, maxItems))} filteredMovies={filteredMovies} moviesType={props.moviesType} />
          {filteredMovies.length > shownItems && <button className="movies__more-btn" onClick={toggleShowMore}>Ещё</button>}
        </>)}
      </section>
      <Footer />
    </>
  )
}

export default Movies;