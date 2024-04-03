import Navigation from "./Navigation/Navigation";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className={`header ${props.isThemeWhite ? 'header_white' : ''}`}>
      <div className="header__container">
        <Link to="/">
          <div className="header__movies-logo" />
        </Link>
        {props.isLoggedIn ? (
          <Navigation isThemeWhite={props.isThemeWhite}
            isMoviesActive={props.isMoviesActive}
            isSavedMoviesActive={props.isSavedMoviesActive}
            isProfileActive={props.isProfileActive} 
            isMainActive = {props.isMainActive}/>
        ) : (
          <div className="header__sign-container">
            <Link to="/signup" className="header__link-signup">Регистрация</Link>
            <Link to="/signin">
              <button className="header__btn-signin">Войти</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;