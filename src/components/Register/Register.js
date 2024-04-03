import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister, isLoading }) => {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = e.target;

    if (name === 'name') {
      if (!input.validity.valid) {
        setErrorName(input.validationMessage);
      } else {
        setErrorName('');
      }
    } else if (name === 'email') {
      if (!input.validity.valid) {
        setErrorEmail(input.validationMessage);
      } else {
        setErrorEmail('');
      }
    } else if (name === 'password') {
      if (!input.validity.valid) {
        setErrorPassword(input.validationMessage);
      } else {
        setErrorPassword('');
      }
    }

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue.name, formValue.email, formValue.password);
  };

  return (<>
    <section className="register">
      <div className="register__logo"></div>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="input__conatiner">
          <p className="register__placeholder">Имя</p>
          <input
            type="text"
            minLength={2}
            maxLength={30}
            className={"register__form-input" + (errorName ? " register__form-input_type_error" : "")}
            name="name"
            value={formValue.name}
            required={true}
            onChange={handleChange} />
          <span className="register__error" id="nameError">{errorName}</span>
        </div>
        <div className="input__conatiner">
          <p className="register__placeholder">Email</p>
          <input
            type="email"
            className={"register__form-input" + (errorEmail ? " register__form-input_type_error" : "")}
            name="email"
            value={formValue.email}
            required={true}
            onChange={handleChange} />
          <span className="register__error" id="emailError">{errorEmail}</span>
        </div>
        <div className="input__conatiner">
          <p className="register__placeholder">Пароль</p>
          <input
            type="password"
            className={"register__form-input" + (errorPassword ? " register__form-input_type_error" : "")}
            name="password"
            value={formValue.password}
            required={true}
            minLength={6}
            onChange={handleChange} />
          <span className="register__error" id="passwordError">{errorPassword}</span>
        </div>
        <button className="register__form-submit-btn" type="submit">{isLoading ? "Регистрация..." : "Зарегистрироваться"}</button>
      </form>
      <div className="register__toggle-login">
        <p className="register__toggle-login-subtitle">Уже зарегистрированы?&nbsp;</p>
        <Link to="/signin" className="register__toggle-login-link">Войти</Link>
      </div>
    </section >
  </>
  );
}

export default Register;