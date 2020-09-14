export default function keywordCounter(arr) {
  const result = {};
  arr.data.forEach((elem) => {
    result[elem.keyword] = result[elem.keyword] + 1 || 1;
  });
  return Object.keys(result).sort((a, b) => result[b] - result[a]);
}
