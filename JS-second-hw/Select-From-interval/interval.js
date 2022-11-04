function selectFromInterval(array, firstNumber, secondNumber) {
    const ARRAY_OF_VALUES = [];
    if (!Array.isArray(array) || isNaN(firstNumber) || isNaN(secondNumber)) {
        throw new Error('Please check the entry parameters');
    }
    let number;
    if (firstNumber > secondNumber) {
        number = firstNumber;
        firstNumber = secondNumber;
        secondNumber = number;
    }
    for (let iterator = 0; iterator < array.length; iterator++) {
        if (array[iterator] >= firstNumber && array[iterator] <= secondNumber) {
           ARRAY_OF_VALUES.push(array[iterator]);
        }
    }
    return ARRAY_OF_VALUES;
}
