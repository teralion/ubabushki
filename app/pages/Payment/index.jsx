import React from 'react';

import PaymentPageWrap from 'app/components/TextPageWrap';

import css from './index.styl';

export default function PaymentPage() {
  return (
    <>
      <PaymentPageWrap className={css.main}>
        <h1 className={css.title}>Оплата</h1>

        {`Оплата производится курьеру в руки наличными 
        по чеку. Чек оформляется при подтверждении заказа. 
        Время доставки оговаривается с вами отдельно.`}
        <p />
        {'Заказ до 750 рублей — доставка 100 рублей.'}
        <br />
        <span className={css.accent}>
          {'Свыше 750 рублей — доставка в подарок!'}
        </span>
        <p />


        <span className={css.accent}>
          Прием заказов
        </span>
        {' '}
        {': Понедельник — Пятница с 10:00 до 15:00.'}
        <br />
        <span className={css.accent}>Доставка</span>
        {': Понедельник — Пятница с 11:00 до 16:00.'}
        <br />
        <span className={css.accent}>Телефон:</span>
        {' '}
        <a href="tel:+74012523090">+7 (4012) 523-090</a>
        <p />
        {`Заказ на текущий день принимается только на 
        блюда в наличии. На следующий день — по всему ассортименту дня.`}
        <p />
      </PaymentPageWrap>
    </>
  );
}
