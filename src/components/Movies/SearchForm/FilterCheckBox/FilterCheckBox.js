function FilterCheckBox(props) {
  console.log(props.isShortChecked);
  const handleCheckBox = () => {
    props.onChange(props.isShortChecked);
  };

  return (<div className="filter-check-box">
    <label className="filter-check-box__switch">
      <input type="checkbox" checked={props.isShortChecked} onChange={handleCheckBox}/>
        <span className="filter-check-box__slider"></span>
    </label>
    <p className="filter-check-box__text">Короткометражки</p>
  </div>
  )
}

export default FilterCheckBox;