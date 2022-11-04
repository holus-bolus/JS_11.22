function createIterable(start, end) {
    if ((start === false || end === false) || (isNaN(+start)) || isNaN(+end) || (end <= start)) {
        throw new Error();
    }
    let range = {
        from: start,
        to: end,

        [Symbol.iterator]() {
            this.current = this.from;
            return this;
        },
        next() {
            if (this.current <= this.to) {
                return {done: false, value: this.current++};
            } else {
                return {done: true};
            }
        }
    }
    return range;
}


