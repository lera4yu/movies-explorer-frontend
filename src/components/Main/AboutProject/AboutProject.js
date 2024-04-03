function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="main__title-container">
        <h2 className="main__title main__title_about-project">О проекте</h2>
      </div>
      <div className="about-project__information">
        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
        <h3 className="about-project__subtitle about-project__subtitle-second">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="about-project__text about-project__text-second">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__timeline">
        <h3 className="about-project__week-title about-project__week_one">1 неделя</h3>
        <h3 className="about-project__week-title about-project__week_four">4 недели</h3>
        <p className="about-project__week-subtitle">Back-end</p>
        <p className="about-project__week-subtitle">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;