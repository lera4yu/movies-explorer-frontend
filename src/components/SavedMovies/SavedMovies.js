import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { savedCards } from "../../utils/constants";
import Footer from "../Footer/Footer";

// background-image: url(../../images/delete-icon.svg);

function SavedMovies(props) {
  return (
    <>
      <Header isLoggedIn={props.loggedIn}
        isThemeWhite={true}
        isMoviesActive={false}
        isSavedMoviesActive={true}
        isProfileActive={false} />
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList cardsList={savedCards} />
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies;