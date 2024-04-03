import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {props.cardsList.map((cardItem, i) => (
          <MoviesCard name={cardItem.name}
            image={cardItem.image}
            duration={cardItem.duration}
            key={cardItem._id} 
            isSaved = {cardItem.isSaved}
            isDelete = {cardItem.isDelete}/>))}
      </div>
    </section>
  )
}

export default MoviesCardList;