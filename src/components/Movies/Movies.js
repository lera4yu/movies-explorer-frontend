import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { initialCards } from "../../utils/constants"
import Footer from "../Footer/Footer";
import React from "react";

function Movies(props) {

  let maxItems;

  if (window.innerWidth >= 950) {
    maxItems = 12;
  } else if (window.innerWidth >= 650) {
    maxItems = 8;
  } else {
    maxItems = 5;
  }

  const [showMore, setShowMore] = React.useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Header isLoggedIn={props.loggedIn}
        isThemeWhite={true}
        isMoviesActive={true}
        isSavedMoviesActive={false}
        isProfileActive={false} />
      <section className="movies">
        <SearchForm />
        <MoviesCardList cardsList={initialCards.slice(0, showMore ? initialCards.length : maxItems)} />
        <button className="movies__more-btn" onClick={toggleShowMore}>Ещё</button>
      </section>
      <Footer />
    </>
  )
}

export default Movies;