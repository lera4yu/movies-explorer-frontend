import { Link } from "react-router-dom";
import React from "react";

function Navigation(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navigation__container">
      <button className={`navigation__burger-btn ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></button>
      <div className={`navigation__list-conatiner ${isOpen ? 'open' : ''}`}>
        <ul className="navigation__list">
          <li className="navigation__item navigation__burger-item">
            <Link to="/" className={`navigation__link ${props.isMainActive ? 'navigation__link_active' : ''}`}>Главная</Link>
          </li>
          <li className="navigation__item navigation__item-films">
            <Link to="/movies" className={`navigation__link ${props.isMoviesActive ? 'navigation__link_active' : ''}`}>Фильмы</Link>
          </li>
          <li className="navigation__item navigation__item-saved-films">
            <Link to="/saved-movies" className={`navigation__link ${props.isSavedMoviesActive ? 'navigation__link_active' : ''}`}>Сохранённые фильмы</Link>
          </li>
          <div className="navigation__profile">
            <li className="navigation__item">
              <Link to="/profile" className={`navigation__link navigation__link-profile ${props.isProfileActive ? 'navigation__link_active' : ''}`}>Аккаунт</Link>
            </li>
            <li className="navigation__item">
              <Link to="/profile">
                <button className={`navigation__profile-btn ${props.isThemeWhite ? 'navigation__profile-btn_white' : ''}`}></button>
              </Link>
            </li>
          </div>
          <button className="navigation__exit-btn" onClick={closeMenu}></button>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;