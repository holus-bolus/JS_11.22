/**
 * @param {number} from
 * @param {number} to
 * @returns {{done: boolean, value: number}|{done: boolean}|{next(): ({done: boolean, value}), [Symbol.iterator](): this, from, to}|*}
 */
function createIterableObject(from, to) {
  if (
    from === undefined ||
    to === undefined ||
    Number.isNaN(from) ||
    Number.isNaN(to) ||
    to <= from
  ) {
    throw new Error();
  }
  return {
    from,
    to,
    [Symbol.iterator]() {
      this.current = this.from;
      return this;
    },
    next() {
      if (this.current <= this.to) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
}
