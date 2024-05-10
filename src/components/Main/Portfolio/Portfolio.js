function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className = "portfolio__link-container">
        <a className = "portfolio__link portfolio__link_text" href ="https://github.com/lera4yu/how-to-learn" target="_blank">Статичный сайт</a>
        <a className="portfolio__link portfolio__link_logo" href ="https://github.com/lera4yu/how-to-learn" target="_blank"></a>
      </div>
      <div className = "portfolio__link-container">
        <a className = "portfolio__link portfolio__link_text" href ="https://github.com/lera4yu/russian-travel" target="_blank">Адаптивный сайт</a>
        <a className="portfolio__link portfolio__link_logo" href ="https://github.com/lera4yu/russian-travel" target="_blank"></a>
      </div>
      <div className = "portfolio__link-container">
        <a className = "portfolio__link portfolio__link_text" href ="https://github.com/lera4yu/react-mesto-api-full-gha" target="_blank">Одностраничное приложение</a>
        <a className="portfolio__link portfolio__link_logo" href ="https://github.com/lera4yu/react-mesto-api-full-gha" target="_blank"></a>
      </div>
    </section>
  )
}

export default Portfolio;