class Calculator {
  constructor(firstNumber, secondNumber) {
    if (
      !this.checkIfNumberIsCorrect(firstNumber) ||
      !this.checkIfNumberIsCorrect(secondNumber)
    ) {
      throw new Error();
    }
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
    this.getSum = this.getSum.bind(this);
    this.getMul = this.getMul.bind(this);
    this.getSub = this.getSub.bind(this);
    this.getDiv = this.getDiv.bind(this);
  }

  checkIfNumberIsCorrect(number) {
    return typeof number === 'number' && isFinite(number);
  }

  setX(number) {
    if (!this.checkIfNumberIsCorrect(number)) {
      throw new Error('Please enter a number');
    }
    this.firstNumber = number;
    this.firstNumber.bind(number);
  }

  setY(number) {
    if (!this.checkIfNumberIsCorrect(number)) {
      throw new Error('Please enter a number');
    }
    this.secondNumber = number;
    this.secondNumber.bind(number);
  }

  getSum() {
    return this.firstNumber + this.secondNumber;
  }

  getMul() {
    return this.firstNumber * this.secondNumber;
  }

  getSub() {
    return this.firstNumber - this.secondNumber;
  }

  getDiv() {
    return this.firstNumber / this.secondNumber;
  }
}
