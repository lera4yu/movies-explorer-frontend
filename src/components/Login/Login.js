import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ handleLogin, isLoading, serverError, setServerError }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = e.target;
    setServerError('');

    if (name === 'email') {
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password);
  }

  return (
    <section className="login">
      <Link to="/">
      <div className="login__logo" />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="input__conatiner">
          <p className="login__placeholder">Email</p>
          <input
            type="email"
            className={"login__form-input" + (errorEmail ? " login__form-input_type_error" : "")}
            name="email"
            value={formValue.email}
            required={true}
            onChange={handleChange} />
          <span className="login__error" id="emailError">{errorEmail}</span>
        </div>
        <div className="input__conatiner">
          <p className="login__placeholder">Пароль</p>
          <input
            type="password"
            className={"login__form-input" + (errorPassword ? " login__form-input_type_error" : "")}
            name="password"
            value={formValue.password}
            required={true}
            minLength={6}
            onChange={handleChange} />
          <span className="login__error" id="passwordError">{errorPassword}</span>
        </div>
        <button className="login__form-submit-btn" type="submit"
          disabled={!formValue.email || !formValue.password || errorEmail || errorPassword}>{isLoading ? "Вход..." : "Войти"}</button>
        <span className="login__error login__error-server" id="serverError">{serverError}</span>
      </form>
      <div className="login__toggle-register">
        <p className="login__toggle-register-subtitle">Ещё не зарегистрированы?&nbsp;</p>
        <Link to="/signup" className="login__toggle-register-link" onClick={() => setServerError('')}>Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;