class Calculator {
  constructor(firstNumber, secondNumber) {
    if (
      !firstNumber ||
      !secondNumber ||
      typeof firstNumber !== 'number' ||
      typeof secondNumber !== 'number' ||
      isNaN(firstNumber) ||
      isNaN(secondNumber) ||
      isFinite(firstNumber) ||
      isFinite(secondNumber)
    ) {
      throw new Error('Invalid number');
    }
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
  }

  setX = (number) => {
    if (!number || typeof number !== 'number') {
      throw new Error('Invalid number');
    }
    this.firstNumber = number;
  };

  setY = (number) => {
    if (!number || typeof number !== 'number') {
      throw new Error('Invalid number');
    }
    this.secondNumber = number;
  };

  getSum = () => {
    console.log(this.firstNumber + this.secondNumber);
  };

  getMul = () => {
    console.log(this.firstNumber * this.secondNumber);
  };

  getSub = () => {
    console.log(this.firstNumber - this.secondNumber);
  };

  getDiv = () => {
    if (this.secondNumber === 0) {
      throw new Error("You can't divide on zero");
    }
    console.log(this.firstNumber / this.secondNumber);
  };
}
