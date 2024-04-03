function FilterCheckBox() {
  return (<div className="filter-check-box">
    <label className="filter-check-box__switch">
      <input type="checkbox" />
        <span className="filter-check-box__slider"></span>
    </label>
    <p className="filter-check-box__text">Короткометражки</p>
  </div>
  )
}

export default FilterCheckBox;