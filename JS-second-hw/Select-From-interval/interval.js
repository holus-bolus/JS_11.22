/**
 * @param {number[]} array
 * @param {number} from
 * @param {number} to
 * @returns {number[]}
 */
function selectFromInterval(array, from, to) {
  if (!Array.isArray(array) || isNaN(from) || isNaN(to)) {
    throw new Error('Please check the entry parameters');
  }
  if (from > to) {
    const copiedFrom = from;

    from = to;
    to = copiedFrom;
  }
  return array.filter((number) => {
    if (typeof number !== 'number') {
      throw new Error('The array should have only numbers');
    }
    return number >= from && number <= to;
  });
}
