import { Link } from 'react-router-dom';

function NotFoundPage(props) {
  return (
    <section className="not-found-page">
      <h2 className="not-found-page__number">404</h2>
      <p className="not-found-page__text">Страница не найдена</p>
      <Link to="/movies" className="not-found-page__link">Назад</Link>
    </section>
  );
}

export default NotFoundPage;