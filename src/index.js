class Stack {
  constructor(maxSize = 10) {
    if (
      typeof maxSize !== 'number' ||
      maxSize === Infinity ||
      maxSize === -Infinity ||
      maxSize === 0
    ) {
      throw new Error('Invalid limit value');
    }
    this.maxSize = maxSize;
    this.stack = {};
    this.stackCounter = 0;
  }

  push(item) {
    if (this.stackCounter >= this.maxSize) {
      throw new Error('Limit exceeded');
    }
    this.stackCounter += 1;
    this.stack[this.stackCounter] = item;
  }

  pop() {
    if (this.stackCounter === 0) {
      throw new Error('Empty stack');
    }
    const item = this.stack[this.stackCounter];
    delete this.stack[this.stackCounter];
    this.stackCounter -= 1;
    return item;
  }

  peek() {
    if (this.stack.length === 0) {
      return null;
    }
    return this.stack[this.stackCounter - 1];
  }

  isEmpty() {
    return this.stackCounter === 0;
  }

  toArray() {
    return Object.values(this.stack);
  }

  static fromIterable = (iterable) => {
    if (typeof iterable[Symbol.iterator] !== 'function' || !iterable) {
      throw new Error('Not iterable');
    }
    const newStack = new Stack(iterable.length);
    for (let item of iterable) {
      newStack.push(item);
    }
    return newStack;
  };
}

class LinkedList {
  #start = null;
  #end = null;

  append(item) {
    let nodeElement = new Node(item);
    if (this.#start === null) {
      this.#start = nodeElement;
      this.#end = nodeElement;
    } else {
      this.#end.next = nodeElement;
      this.#end = nodeElement;
    }
  }

  prepend(item) {
    let nodeElement = new Node(item);
    if (this.#start === null) {
      this.#start = nodeElement;
      this.#end = nodeElement;
    } else {
      nodeElement.next = this.#start;
      this.#start = nodeElement;
    }
  }

  find(element) {
    if (this.#start === null) {
      return null;
    }
    let nodeElement = this.#start;
    return this.#cycle(nodeElement, element);
  }

  toArray() {
    const arrayForFill = [];
    return this.#fillAnArray(this.#start, arrayForFill);
  }

  static fromIterable = (iterable) => {
    if (typeof iterable[Symbol.iterator] !== 'function' || !iterable) {
      throw new Error('Not iterable');
    }
    const newLinkedList = new LinkedList();
    for (let item of iterable) {
      newLinkedList.append(item);
    }
    return newLinkedList;
  };

  #cycle(element, item) {
    if (element.value === item) {
      return element.value;
    }
    if (element.next === null) {
      return null;
    }
    return this.#cycle(element.next, item);
  }

  #fillAnArray(element, array) {
    if (element === null) {
      return array;
    }
    array.push(element.value);
    return this.#fillAnArray(element.next, array);
  }
}

class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption
  ) {
    this.brand = brand;
    this.model = model;
    this.yearOfManufacturing = yearOfManufacturing;
    this.maxSpeed = maxSpeed;
    this.maxFuelVolume = maxFuelVolume;
    this.fuelConsumption = fuelConsumption;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('The car has been started already');
    }
    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("The car hasn't been started yet");
    }
    this.#isStarted = false;
  }

  fillUpGasTank(volume) {
    if (typeof volume !== 'number' || volume <= 0) {
      throw new Error('Invalid fuel amount');
    }

    if (this.#currentFuelVolume + volume > this.#maxFuelVolume) {
      throw new Error('Too much fuel');
    }

    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }

    this.#currentFuelVolume += volume;
  }

  drive(speed, driveHours) {
    if (typeof speed !== 'number' || speed <= 0) {
      throw new Error('Invalid speed');
    }

    if (typeof driveHours !== 'number' || driveHours <= 0) {
      throw new Error('Invalid duration');
    }

    if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    }

    if (!this.#isStarted) {
      throw new Error('You have to start your car first');
    }
    const fuelConsumption =
      this.#fuelConsumption * ((speed * driveHours) / 100);

    if (this.#currentFuelVolume - fuelConsumption < 0) {
      throw new Error("You don't have enough fuel");
    }

    if (this.#health < 0) {
      throw new Error("Your car won't make it");
    }
    this.#currentFuelVolume -= fuelConsumption;
    this.#mileage += speed * driveHours;
    this.#health -= 1;
  }

  repair() {
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    if (this.#currentFuelVolume < 0) {
      throw new Error('You have to fill up your gas tank first');
    }
    this.#health = 100;
  }

  getFullAmount() {
    if (this.#currentFuelVolume === parseInt(this.maxFuelVolume)) {
      return 0;
    }
    return parseInt(this.maxFuelVolume) - this.#currentFuelVolume;
  }

  get brand() {
    return this.#brand;
  }

  set brand(brand) {
    if (typeof brand !== 'string' || brand.length < 1 || brand.length > 50) {
      throw new Error('Invalid input');
    }

    this.#brand = brand;
  }

  get model() {
    return this.#model;
  }

  set model(model) {
    if (typeof model !== 'string' || model.length < 1 || model.length > 50) {
      throw new Error('Invalid input');
    }

    this.#model = model;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(yearOfManufacturing) {
    const currentYear = new Date().getFullYear();
    if (
      typeof yearOfManufacturing !== 'number' ||
      yearOfManufacturing < 1950 ||
      yearOfManufacturing > currentYear
    ) {
      throw new Error('Invalid input');
    }
    this.#yearOfManufacturing = yearOfManufacturing;
  }

  get maxSpeed() {
    return `${this.#maxSpeed} km/h`;
  }

  set maxSpeed(maxSpeed) {
    if (typeof maxSpeed !== 'number' || maxSpeed < 100 || maxSpeed > 300) {
      throw new Error('Incorrect input');
    }
    this.#maxSpeed = maxSpeed;
  }

  get maxFuelVolume() {
    return `${this.#maxFuelVolume} liters`;
  }

  set maxFuelVolume(maxFuelVolume) {
    if (
      typeof maxFuelVolume !== 'number' ||
      maxFuelVolume < 5 ||
      maxFuelVolume > 20
    ) {
      throw new Error('Incorrect input');
    }

    this.#maxFuelVolume = maxFuelVolume;
  }

  get fuelConsumption() {
    return `${this.#fuelConsumption} liters/100 km`;
  }

  set fuelConsumption(fuelConsumption) {
    if (typeof fuelConsumption !== 'number') {
      throw new Error('Incorrect input');
    }

    this.#fuelConsumption = fuelConsumption;
  }

  get currentFuelVolume() {
    return `${this.#currentFuelVolume} liters`;
  }

  get isStarted() {
    return this.#isStarted ? 'true' : 'false';
  }

  get mileage() {
    return `${this.#mileage} km`;
  }
}
