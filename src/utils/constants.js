const initialCards = [
  {
    name: '33 слова о дизайне',
    duration: '1ч 17м',
    image: require('../images/film-img-1.jpg'),
    _id: 1,
    isSaved: true
  },
  {
    name: 'Киноальманах «100 лет дизайна»',
    duration: '1ч 17м',
    image: require('../images/film-img-2.jpg'),
    _id: 2,
    isSaved: true
  },
  {
    name: 'В погоне за Бенкси',
    duration: '1ч 17м',
    image: require('../images/film-img-3.jpg'),
    _id: 3,
    isSaved: true
  },
  {
    name: 'Баския: Взрыв реальности',
    duration: '1ч 17м',
    image: require('../images/film-img-4.jpg'),
    _id: 4
  },
  {
    name: 'Бег это свобода',
    duration: '1ч 17м',
    image: require('../images/film-img-5.jpg'),
    _id: 5
  },
  {
    name: 'Книготорговцы',
    duration: '1ч 17м',
    image: require('../images/film-img-6.jpg'),
    _id: 6
  },
  {
    name: 'Когда я думаю о Германии ночью',
    duration: '1ч 17м',
    image: require('../images/film-img-7.jpg'),
    _id: 7
  },
  {
    name: 'Gimme Danger: История Игги и The Stooges',
    duration: '1ч 17м',
    image: require('../images/film-img-8.jpg'),
    _id: 8
  },
  {
    name: 'Дженис: Маленькая девочка грустит',
    duration: '1ч 17м',
    image: require('../images/film-img-9.jpg'),
    _id: 9
  },
  {
    name: 'Соберись перед прыжком',
    duration: '1ч 17м',
    image: require('../images/film-img-10.jpg'),
    _id: 10
  },
  {
    name: 'Пи Джей Харви: A dog called money',
    duration: '1ч 17м',
    image: require('../images/film-img-11.jpg'),
    _id: 11
  },
  {
    name: 'По волнам: Искусство звука в кино',
    duration: '1ч 17м',
    image: require('../images/film-img-12.jpg'),
    _id: 12
  }
];

const savedCards = [
  {
    name: '33 слова о дизайне',
    duration: '1ч 17м',
    image: require('../images/film-img-1.jpg'),
    _id: 1,
    isDelete: true
  },
  {
    name: 'Киноальманах «100 лет дизайна»',
    duration: '1ч 17м',
    image: require('../images/film-img-2.jpg'),
    _id: 2,
    isDelete: true
  },
  {
    name: 'В погоне за Бенкси',
    duration: '1ч 17м',
    image: require('../images/film-img-3.jpg'),
    _id: 3,
    isDelete: true
  }
];

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

const CONFLICT_ERROR = 409;

const UNAUTHORIZED_ERROR = 401;

const IS_VALID_NAME_REGULAR = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;

const IS_VALID_EMAIL_REGULAR = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const SCREEN_WIDTH_BIG = 950;

const SCREEN_WIDTH_MEDIUM = 650;

const CARD_ITEMS_SIZE_BIG = [12, 3];

const CARD_ITEMS_SIZE_REGULAR = [8, 2];

const CARD_ITEMS_SIZE_SMALL = [5, 2];

const SEC_DELAY = 250;

const SHORT_MOVIE_DURATION = 40;

export {
  initialCards, savedCards, checkRes, CONFLICT_ERROR, UNAUTHORIZED_ERROR,
  IS_VALID_NAME_REGULAR, IS_VALID_EMAIL_REGULAR, SCREEN_WIDTH_BIG, SCREEN_WIDTH_MEDIUM,
  CARD_ITEMS_SIZE_BIG, CARD_ITEMS_SIZE_REGULAR, CARD_ITEMS_SIZE_SMALL, SEC_DELAY, SHORT_MOVIE_DURATION
};