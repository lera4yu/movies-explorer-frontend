function MoviesCard(props) {

  let duration;
  
  if (props.duration >= 60) {
    duration = String(Math.floor(props.duration / 60) + 'ч ' + (props.duration % 60) + 'мин');
  } else {
    duration = props.duration + 'мин';
  }

  function openTrailer() {
    window.open(props.trailer, "_blank");
  }

  return (
    <div className="movies-card">
      <img className="movies-card__img" src={props.image} alt={props.name} onClick={openTrailer}/>
      <h3 className="movies-card__name">{props.name}</h3>
      <p className="movies-card__duration">{duration}</p>
      <button className={props.isSaved || props.isDelete ? "movies-card__btn_disable" : "movies-card__btn"} onClick={props.onSave}>Сохранить</button>
      <div className={props.isSaved ? "movies-card__btn_type_saved" : ""} onClick={props.onDelete}></div>
      <div className={props.isDelete ? "movies-card__btn_type_delete" : ""} onClick={props.onDelete}></div>
    </div>)
}

export default MoviesCard;