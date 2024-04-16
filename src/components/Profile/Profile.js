import Header from "../Header/Header";
import { Link } from "react-router-dom";
import React from "react";
import { isValidEmail, isValidName } from "../../utils/constants";

function Profile(props) {

  const [formValue, setFormValue] = React.useState(props.currentUser);
  const [editing, setEditing] = React.useState(false);

  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = e.target;
    
    const isValidNameReg = isValidName.test(value);
    const isValidEmailReg = isValidEmail.test(value);

    if (name === 'name') {
      if (!input.validity.valid) {
        setErrorName(input.validationMessage);
      } else {
        if (!isValidNameReg) {
          setErrorName('Недопустимые символы в имени.');
        } else {
          setErrorName('');
        }
      }
    } else if (name === 'email') {
      if (!input.validity.valid) {
        setErrorEmail(input.validationMessage);
      } else {
        if (!isValidEmailReg) {
          setErrorEmail('Формат email неверный');
        } else {
          setErrorEmail('');
        }
      }
    }

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  React.useEffect(() => {
    props.setCurrentUser({
      name: props.currentUser.name,
      email: props.currentUser.email,
    });
  }, [props.currentUser.name, props.currentUser.email]);

  const signOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("selector");
    localStorage.removeItem("isShortChecked");
    localStorage.removeItem("filteredMovies");
    props.setLoggedIn(false);
    props.setCurrentUser({
      name: "",
      email: "",
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if ((props.currentUser.name === formValue.name) && (props.currentUser.email === formValue.email)) {
      setError("Имя пользователя и почта не были Вами изменены");
    } else {
      setError('');
      props.onEdit(formValue).then((res) => props.setCurrentUser(formValue)).then((res) => setEditing(false));
    }
  };

  const onEditClick = () => {
    setError('');
    setEditing(true);
  }


  return (
    <>
      <Header isLoggedIn={props.loggedIn}
        isThemeWhite={true}
        isMoviesActive={false}
        isSavedMoviesActive={false}
        isProfileActive={true} />
      <form className="profile" onSubmit={onSubmitForm}>
        <h2 className="profile__title">{`Привет, ${props.currentUser.name}!`}</h2>
        <div className="profile__data-container">
          <h3 className="profile__subtitle profile__subtitle-name">Имя</h3>
          <input
            type="text"
            minLength={2}
            maxLength={30}
            className={"profile__data profile__name" + (errorName ? " profile__form-input_type_error" : "")}
            name="name"
            value={formValue.name}
            required={true}
            onChange={handleChange} />
          <span className="profile__error profile__error-name" id="nameError">{errorName}</span>
          <h3 className="profile__subtitle profile__subtitle-email">Email</h3>
          <input
            type="email"
            className={"profile__data profile__email" + (errorEmail ? " profile__form-input_type_error" : "")}
            name="email"
            value={formValue.email}
            required={true}
            onChange={handleChange} />
          <span className="profile__error profile__error-email" id="emailError">{errorEmail}</span>
        </div>
        <div className="profile__edit-container">
          {!editing ? (
            <button className="profile__edit" type="button" onClick={onEditClick} key={1}>Редактировать</button>
          ) : (
            <button className="profile__edit-submit" type="submit" key={2} 
            disabled= {!formValue.email || !formValue.name || errorName || errorEmail || error}>{props.isLoading ? "Сохранение..." : "Сохранить"}</button>
          )}
          <span className="profile__error profile__error-edit" id="editError">{error}</span>
        </div>
        <div className="profile__exit-container">
          {!editing ? (
            <Link to="/signin" className="profile__exit" onClick={signOut}>Выйти из аккаунта</Link>) : (<></>)}
        </div>
      </form>
    </>
  )
}

export default Profile;