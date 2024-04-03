function MoviesCard(props) {
  console.log(props.isSaved);
  return (
  <div className="movies-card">
    <img  className = "movies-card__img" src = {props.image} alt = {props.name} />
    <h3 className="movies-card__name">{props.name}</h3>
    <p className="movies-card__duration">{props.duration}</p>
    <button className={props.isSaved||props.isDelete ? "movies-card__btn_disable" : "movies-card__btn"}>Сохранить</button>
    <div className={props.isSaved ? "movies-card__btn_type_saved" : ""}></div>
    <div className={props.isDelete ? "movies-card__btn_type_delete" : ""}></div>
  </div>)
}

export default MoviesCard;