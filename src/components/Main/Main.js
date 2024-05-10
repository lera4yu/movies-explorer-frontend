import React from 'react';
import Header from '../Header/Header.js';
import Promo from '../Main/Promo/Promo.js';
import NavTab from '../Main/NavTab/NavTab.js';
import AboutProject from '../Main/AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';

function Main(props) {
  return (
    <>
      <Header isLoggedIn={props.loggedIn}
        isThemeWhite={false}
        isMoviesActive={false}
        isSavedMoviesActive={false}
        isProfileActive={false} 
        isMainActive = {true}/>
      <section className="main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </section>
      <Footer />
    </>
  )
}

export default Main;
