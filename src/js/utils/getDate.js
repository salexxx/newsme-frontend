export default function getDate() {
  const date = (new Date() - 1000 * 60 * 60 * 24 * 7); // минус неделя
  const d = new Date(date).toJSON().split('T');
  return d[0];
}
