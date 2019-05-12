import React from 'react';
import Helmet from 'react-helmet';

const metaInfos = [
  {
    name: 'description',
    content: 'Кафе "У бабушки" расположено в торговом центре "Мега Центр" (ул. ген.Озерова, 17б) на втором этаже - на фудкорте. В ассортименте блюда современной российской кухни. При визите на фудкорт есть предложения по комплексным обедам от 150 рублей.',
  },
  {
    name: 'og:description',
    content: 'Кафе "У бабушки" расположено в торговом центре "Мега Центр" (ул. ген.Озерова, 17б) на втором этаже - на фудкорте. В ассортименте блюда современной российской кухни. При визите на фудкорт есть предложения по комплексным обедам от 150 рублей.',
  },
  {
    name: 'og:title',
    content: 'Доставка обедов и готовой еды по городу Калининграду — Кафе «У Бабушки», +7 4012 523-090',
  },
];

export default function Meta() {
  return (
    <>
      <Helmet>
        <title>
          {`Доставка обедов и готовой еды по городу 
          Калининграду — Кафе «У Бабушки», +7 4012 523-090`}
        </title>
        {metaInfos.map(info => (
          <meta name={info.name} content={info.content} />
        ))}
      </Helmet>
    </>
  );
}

Meta.propTypes = {};
Meta.defaultProps = {};

export { Helmet };
