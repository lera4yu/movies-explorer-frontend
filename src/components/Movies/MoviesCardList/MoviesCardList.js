import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  const isDelete = (props.moviesType === 'saved');

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {props.cardsList.map((cardItem, i) => (
          <MoviesCard name={cardItem.nameRU}
            image={cardItem.image}
            duration={cardItem.duration}
            key={isDelete ? cardItem.movieId : cardItem.id}
            trailer={cardItem.trailerLink}
            isSaved={cardItem.isSaved}
            isDelete={isDelete}
            onSave={() => props.onSave(cardItem)}
            onDelete={() => props.onDelete(cardItem, props.moviesType)}
            moviesType={props.moviesType}
          />))}
      </div>
    </section>
  )
}

export default MoviesCardList;