import React from "react";
import FilterCheckBox from "./FilterCheckBox/FilterCheckBox";

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <div className="search-form__logo"></div>
        <input type="text" className="search-form__input" placeholder="Фильм" />
        <button className="search-form__btn">Найти</button>
        {(window.innerWidth >= 650) ? (<FilterCheckBox />) : (<></>)}
      </div>
      {(window.innerWidth < 650) ? (<FilterCheckBox />) : (<></>)}
    </section>
  );
}

export default SearchForm;
