
const meta = {
  soups: {
    name: 'Супы',
  },
  main: {
    name: 'Горячее',
  },
  trimmings: {
    name: 'Гарниры',
  },
  salads: {
    name: 'Салаты',
  },
  supplements: {
    name: 'Дополнительно',
  },
};

const items = {
  soups: [
    {
      id: 1,
      url: 'https://ubabushki.com/files/dishes/540-360/dcb65744d3330ab5adc4f8a1ca424d9a.jpg',
      title: 'Рассольник',
      description: 'Приготовлен на соленых огурчиках и перловке, чтобы день начался удачно.',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [0, 1, 2],
    },
    {
      id: 2,
      url: 'https://ubabushki.com/files/dishes/540-360/af441bc7beeb848880f9762602af1484.jpg',
      title: 'Куриный суп со звездочками',
      description: 'На наваристом бульоне, подойдет и взрослым, и детям.',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [3, 4, 5],
    },
    {
      id: 20,
      url: 'https://ubabushki.com/files/dishes/540-360/0bd24571664d6b15981719f6b95c2f62.jpg',
      title: 'Суп с фрикадельками',
      description: 'Маленькие мясные шарики в наваристом курином бульоне, что может быть вкуснее.',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [1, 2, 6],
    },
    {
      id: 21,
      url: 'https://ubabushki.com/files/dishes/540-360/f8a49074812857e71f667ec247568548.jpg',
      title: 'Харчо',
      description: 'На говяжьем бульоне, терпкий ароматный суп с кавказским настроением.',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [2, 3, 4, 5],
    },
    {
      id: 22,
      url: 'https://ubabushki.com/files/dishes/540-360/b54691ec0e87e05496534daeb22e6606.jpg',
      title: 'Уха',
      description: 'Наваристый бульон на голове семги заправляется овощами.',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [0, 6],
    },
    {
      id: 23,
      url: 'https://ubabushki.com/files/dishes/540-360/40af206a81ec3c529b062649021848f0.jpg',
      title: 'Сырный крем-суп',
      description: 'Добавление чеддера и сливок превращают это блюдо в настоящий кулинарный шедевр.',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [3, 4, 5],
    },
    {
      id: 24,
      url: 'https://ubabushki.com/files/dishes/540-360/1ed976950de0d4fd30d0f478a8a2e9b3.jpg',
      title: 'Грибной крем-суп',
      description: 'На курином бульоне, умягчен добавлением сливок и сметаны.',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [0, 1, 6],
    },
    {
      id: 25,
      url: 'https://ubabushki.com/files/dishes/540-360/941f2819d898dbc34617d8b0ff3c4612.jpg',
      title: 'Солянка',
      description: 'Четыре вида колбас в наваристом бульоне с лимончиком и оливками. Невозможно оторваться!',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [0, 4, 5],
    },
    {
      id: 26,
      url: 'https://ubabushki.com/files/dishes/540-360/8c01026ca3fe9dc0bc36cdfb7ea3a50d.jpg',
      title: 'Борщ',
      description: 'Приготовлен на бульоне, который томился 3 часа, рубиновый, домашний.',
      piece: 200,
      entity: 'мл.',
      price: 90,
      options: [],
      dayWeeks: [2, 3, 4],
    },
  ],
  main: [
    {
      id: 3,
      url: 'https://ubabushki.com/files/dishes/540-360/bd77ed3224140ad86d2fcf340e90a8a8.jpg',
      title: 'Пожарские котлеты',
      description: 'Котлета из рубленого куриного мяса в панировке из сухариков.',
      piece: 100,
      entity: 'гр.',
      price: 95,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 4,
      url: 'https://ubabushki.com/files/dishes/540-360/e3fec40647d811f01666cd307c9b613e.jpg',
      title: 'Котлеты домашние',
      description: 'На фарше из задней части курицы - сочные и румяные. Сверху ломтик помидора под сыром для вкуса.',
      piece: 100,
      entity: 'гр.',
      price: 95,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 5,
      url: 'https://ubabushki.com/files/dishes/540-360/bf0d006a3c5c259696f07a42bda61727.jpg',
      title: 'Рыбные тефтели',
      description: 'Такие нежные, что тают во рту. Подаются под красным соусом.',
      piece: 100,
      entity: 'гр.',
      price: 95,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 6,
      url: 'https://ubabushki.com/files/dishes/540-360/53db9529a7a57df1f4c329b9944b78e2.jpg',
      title: 'Голубцы',
      description: 'Много фарша, завернутого в тонкий ломкий лист капусты, политый подливой.',
      piece: 100,
      entity: 'гр',
      price: 95,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 7,
      url: 'https://ubabushki.com/files/dishes/540-360/787aa113b9b522d1801340057ebc220a.jpg',
      title: 'Гуляш',
      description: 'Чистое мясо, которое украсит любой гарнир -сытно и вкусно!',
      piece: 100,
      entity: 'гр.',
      price: 125,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 8,
      url: 'https://ubabushki.com/files/dishes/540-360/b667776bdebc8f654dd43ae9c69c71f4.jpg',
      title: 'Курица в кляре',
      description: 'Куриная грудка, замаринованная и пожаренная в кляре. Пальчики оближешь!',
      piece: 100,
      entity: 'гр.',
      price: 125,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 9,
      url: 'https://ubabushki.com/files/dishes/540-360/e3d17046c4f362c7f6e5d48443ad47f0.jpg',
      title: 'Пельмени',
      description: 'Лепим сами от теста до начинки. Попробуйте со сметанкой!',
      piece: 15,
      entity: 'шт.',
      price: 95,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 10,
      url: 'https://ubabushki.com/files/dishes/540-360/f23433eaba1762f466d8e9d9ffd98aaa.jpg',
      title: 'Блины',
      description: 'Держим на кухне готовое тесто, готовим при вас. Топинг по желанию: сметана, джем или сгущенка!',
      piece: 2,
      entity: 'шт.',
      price: 60,
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
      options: [
        {
          id: 11,
          name: 'без топинга',
          price: 50,
        },
        {
          id: 12,
          name: 'с джемом',
          price: 60,
        },
        {
          id: 13,
          name: 'со сметаной',
          price: 60,
        },
        {
          id: 14,
          name: 'со сгущенкой',
          price: 60,
        },
      ],
    },
  ],
  trimmings: [
    {
      id: 15,
      url: 'https://ubabushki.com/files/dishes/540-360/c3984e9771bc1c6becb675e6fa5b6b58.jpg',
      title: 'Макароны',
      description: 'Классический гарнир.',
      piece: 150,
      entity: 'гр.',
      price: 30,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 16,
      url: 'https://ubabushki.com/files/dishes/540-360/ef7d571ac90a61852b0690141d988777.jpg',
      title: 'Пюре',
      description: 'Для пюре мы растираем отваренный картофель через сито, а потом взбиваем его с маслом и сливками.',
      piece: 150,
      entity: 'гр.',
      price: 40,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 17,
      url: 'https://ubabushki.com/files/dishes/540-360/1dfdde65141891a9a71576f103b2efb2.jpg',
      title: 'Картофель по-деревенски',
      description: 'Картофель режем дольками и доводим под специями до хрустящей корочки в духовке.',
      piece: 150,
      entity: 'гр.',
      price: 40,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 18,
      url: 'https://ubabushki.com/files/dishes/540-360/53109e5e802f1fc77e2db11743d6abf9.jpg',
      title: 'Тушеная капуста',
      description: 'С морковкой и луком, тает во рту. Подойдет к любому блюду.',
      piece: 150,
      entity: 'гр.',
      price: 40,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
  salads: [
    {
      id: 19,
      url: 'https://ubabushki.com/files/dishes/540-360/2760da7178e92f179d7c76aaa82ec064.jpg',
      title: 'Винегрет',
      description: 'Все по классике: свекла, морковь, картофель, капуста, соленые огурцы, лук и немного растительного масла.',
      piece: 100,
      entity: 'гр.',
      price: 40,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 20,
      url: 'https://ubabushki.com/files/dishes/540-360/a63851ac61df5010ecd836ebc232ca62.jpg',
      title: 'Оливье',
      description: 'Новогоднее настроение круглый год!',
      piece: 100,
      entity: 'гр.',
      price: 40,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
  supplements: [
    {
      id: 21,
      url: 'https://ubabushki.com/files/dishes/540-360/e3926ef8789a78940a34873e8eed1d91.jpg',
      title: 'Хлеб',
      description: '',
      piece: 20,
      entity: 'гр.',
      price: 5,
      options: [],
      dayWeeks: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
};

export default items;
export { meta };
