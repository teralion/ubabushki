import React from 'react';

import AboutPageWrap from 'app/layout/TextPageWrap';

import css from './index.styl';

export default function AboutPage() {
  return (
    <>
      <AboutPageWrap className={css.main}>
        <h1 className={css.title}>
          О нас
        </h1>
        {'Кафе «У бабушки» расположено в торговом центре'}
        {' '}
        <span className={css.accent}>
          {'«Мега Центр» на ул. ген.Озерова, 17б'}
        </span>
        {' '}
        {'на втором этаже — на фудкорте.'}
        <p />
        <span className={css.accent}>
          В ассортименте блюда современной российской кухни.
        </span>
        {' '}
        {`При визите на фудкорт есть предложения по 
        комплексным обедам от 150 рублей.
        Мы также готовим и доставляем заказы по всему городу.`}
        <p />

        <span className={css.accent}>
          {`Особенность нашей работы — 
          новое меню каждый день.`}
        </span>
        {' '}
        {`Наша еда готовится по классическим рецептам и 
        не приедается. Бульоны наваристые, в котлетах 
        много мяса. Не экономим на гарнирах. 
        Но при этом стараемся держать хорошие цены 
        при высоком качестве продукции.`}
      </AboutPageWrap>
    </>
  );
}
