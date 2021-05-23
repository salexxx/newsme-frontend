function getDate() {
  const date = (new Date() - 1000 * 60 * 60 * 24 * 7); // минус неделя
  const d = new Date(date).toJSON().split('T');
  return d[0];
}

function dateFormater(date) {
  const d = new Date(date);
  const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  return `${d.getDate()} ${month[d.getMonth()]}, ${d.getFullYear()}`;
}

export default { getDate, dateFormater };
