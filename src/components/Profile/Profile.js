import Header from "../Header/Header";

function Profile(props) {
  return (
    <>
      <Header isLoggedIn={props.loggedIn}
        isThemeWhite={true}
        isMoviesActive={false}
        isSavedMoviesActive={false}
        isProfileActive={true} />
      <section className="profile">
        <h2 className="profile__title">Привет, {props.name}!</h2>
        <div className="profile__data-container">
          <h3 className="profile__subtitle profile__subtitle-name">Имя</h3>
          <h3 className="profile__data profile__name">{props.name}</h3>
          <h3 className="profile__subtitle profile__subtitle-email">Email</h3>
          <h3 className="profile__data profile__email">{props.email}</h3>
        </div>
        <div className="profile__edit-container">
          <a href="" className="profile__edit">Редактировать</a>
        </div>
        <div className="profile__exit-container">
          <a href="" className="profile__exit">Выйти из аккаунта</a>
        </div>
      </section>
    </>
  )
}

export default Profile;