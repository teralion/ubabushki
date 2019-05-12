import React from 'react';

import Map from 'app/elements/Map';

import ContactsPageWrap from 'app/layout/TextPageWrap';

import css from './index.styl';

export default function Main() {
  return (
    <>
      <ContactsPageWrap className={css.main}>
        <h1 className={css.title}>
          Контакты
        </h1>
        ИП Шахова Ирина Владимировна
        <br />
        ИНН 391404886977
        <p />

        ТОЧКА ПАО БАНКА «ФК ОТКРЫТИЕ»
        <br />
        р/с 40802810010500001346
        <br />
        БИК 044525999
        <br />
        к/с 30101810845250000999
        <p />

        <span className={css.accent}>
          Кафе «У бабушки»
        </span>
        <br />
        <span className={css.accent}>
          Калининград, ул. Генерала Озерова, 17Б, 2й этаж, фудкорт.
        </span>
        <p />
        Телефон:
        {' '}
        <a href="tel:+74012523090">+7 (4012) 523-090</a>

        <Map className={css.map} />
      </ContactsPageWrap>
    </>
  );
}
