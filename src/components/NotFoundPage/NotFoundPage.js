import { Link } from 'react-router-dom';

function NotFoundPage(props) {
  const goBack = () => {
    props.navigate(-1);
  }

  return (
    <section className="not-found-page">
      <h2 className="not-found-page__number">404</h2>
      <p className="not-found-page__text">Страница не найдена</p>
      <Link className="not-found-page__link" onClick={goBack}>Назад</Link>
    </section>
  );
}

export default NotFoundPage;