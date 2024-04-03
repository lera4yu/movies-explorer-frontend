function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="main__title-container main__title-container-about-me">
        <h2 className="main__title">Студент</h2>
      </div>
      <div className="about-me__container">
        <h3 className="about-me__name">Валерия</h3>
        <h4 className="about-me__text">Фронтенд-разработчик, 24 года</h4>
        <p className="about-me__description">Я родилась в Москве, но сейчас живу в Нидерландах.
        Окончила ВШЭ, факультет Бизнес-Информатики. 
        Год работала дата-аналитиком в IT, но решила, что больше хотела бы кодить. 
        Сейчас заканчиваю курс по веб-разработке и планирую искать вакансии зарубежом. 
        Параллельно увлекаюсь геймингом и музыкой.</p>
        <a className="about-me__link-git" href = "https://github.com/lera4yu" target="_blank">Github</a>
        <div className="about-me__photo"></div>
      </div>
    </section>
  )
}

export default AboutMe;