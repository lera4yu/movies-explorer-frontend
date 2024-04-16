import React from "react";
import { useLocation } from "react-router-dom";
import FilterCheckBox from "./FilterCheckBox/FilterCheckBox";

function SearchForm(props) {
  const [isShortChecked, setShortChecked] = React.useState(false);
  const [error, setError] = React.useState('');
  const [inputValue, setInputValue] = React.useState("");
  const location = useLocation();

  const handleInput = (evt) => {
    setInputValue(evt.target.value);
    setError('');
  };

  const handleSubmit = (evt) => {
    props.setLoading(true);
    evt.preventDefault();
    if (!inputValue) {
      setError('Нужно ввести ключевое слово');
      props.setLoading(false);
      return;
    }
    setError('');
    props.onSearch(inputValue, isShortChecked);
    if (location.pathname === "/movies") {
      localStorage.setItem("selector", inputValue);
      localStorage.setItem("isShortChecked", JSON.stringify(isShortChecked));
    }
  };

  React.useEffect(() => {
    if (location.pathname === "/movies") {
      const savedInputValue = localStorage.getItem("selector");
      const savedShortChecked = localStorage.getItem("isShortChecked");
      if (savedInputValue) {
        setInputValue(savedInputValue);
      }
      if (savedShortChecked) {
        setShortChecked(JSON.parse(savedShortChecked));
      }
    }
  }, [location.pathname]);

  const handleCheckbox = () => {
    props.setLoading(true);
    setShortChecked(!isShortChecked);
    props.handleCheckbox(inputValue, !isShortChecked);
    if (location.pathname === "/movies") {
      localStorage.setItem("selector", inputValue);
      localStorage.setItem("isShortChecked", JSON.stringify(!isShortChecked));
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__container" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="search-form__logo"></div>
        <input type="text" className="search-form__input" placeholder="Фильм" onChange={handleInput} value={inputValue} />
        <span className="search-form__error" id="searchError">{error || props.serverError}</span>
        <button className="search-form__btn">Найти</button>
        {(window.innerWidth > 650) ? (<FilterCheckBox onChange={handleCheckbox} isShortChecked={isShortChecked} setShortChecked={setShortChecked} />) : (<></>)}
      </form>
      {(window.innerWidth <= 650) ? (<FilterCheckBox onChange={handleCheckbox} isShortChecked={isShortChecked} setShortChecked={setShortChecked} />) : (<></>)}
    </section>
  );
}

export default SearchForm;