/* eslint-disable-next-line import/no-self-import */
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const formatDay = day => moment(day).format('DD-MM-YYYY');
const toISOString = day => moment(day, 'DD-MM-YYYY').toISOString(true);

export { formatDay };
export { toISOString };
export default moment;
