function warmOrCold() {
    let firstNumber = 0;
    let secondNumber = 0;
    let amountOfTries = 1;
    let numbersStorage = 0;
    let ASK_FIRST_NUMBER = prompt('Enter a first positive number');
    while (ASK_FIRST_NUMBER < 0) {
        alert('Please enter only positive numbers');
        ASK_FIRST_NUMBER = prompt('Enter a first positive number');
    }
    firstNumber += +ASK_FIRST_NUMBER;
    const ASK_SECOND_NUMBER = prompt(`Enter a second positive number greater than ${parseInt(ASK_FIRST_NUMBER) + 100}`);
    if (+ASK_SECOND_NUMBER < +(parseInt(ASK_FIRST_NUMBER) + 100)) {
        alert(`Please enter a number greater than ${parseInt(ASK_FIRST_NUMBER) + 100}`);
        const ASK_SECOND_NUMBER = prompt(`Enter a second positive number greater than ${parseInt(ASK_FIRST_NUMBER) + 100}`)
    }
    secondNumber += ASK_SECOND_NUMBER;
    let randomNumber = Math.floor(firstNumber - 0.5 + Math.random() * (secondNumber - firstNumber + 1));
    console.log(randomNumber);
    while (true) {
        let GUESS_THE_NUMBER = +prompt('Try to guess the number that has been guessed by the program');
        numbersStorage = +GUESS_THE_NUMBER;
        if ((GUESS_THE_NUMBER < randomNumber || GUESS_THE_NUMBER < numbersStorage) || (GUESS_THE_NUMBER > randomNumber || GUESS_THE_NUMBER > numbersStorage) && amountOfTries === 1) {
            alert('Cold');
            amountOfTries += 1;
        } else if ((GUESS_THE_NUMBER < randomNumber || GUESS_THE_NUMBER < numbersStorage) || (GUESS_THE_NUMBER > randomNumber || GUESS_THE_NUMBER > numbersStorage) && amountOfTries !== 1) {
            alert('Colder');
            amountOfTries += 1;
        } else if ((GUESS_THE_NUMBER !== randomNumber && GUESS_THE_NUMBER < numbersStorage) || (GUESS_THE_NUMBER !== randomNumber && GUESS_THE_NUMBER > numbersStorage) && amountOfTries !== 1) {
            alert('Cold');
            amountOfTries += 1;
        } else if ((GUESS_THE_NUMBER + 10 === randomNumber) || (GUESS_THE_NUMBER - 10 === randomNumber)) {
            alert('Warm!');
            amountOfTries += 1;
        } else if ((GUESS_THE_NUMBER + 5 === randomNumber && GUESS_THE_NUMBER < numbersStorage) || (GUESS_THE_NUMBER - 5 === randomNumber && GUESS_THE_NUMBER < numbersStorage)) {
            alert('Warmer!');
            amountOfTries += 1;
        } else if ((GUESS_THE_NUMBER + 3 === randomNumber && GUESS_THE_NUMBER < numbersStorage) || (GUESS_THE_NUMBER - 3 === randomNumber && GUESS_THE_NUMBER < numbersStorage)) {
            alert('You’re almost there');
            amountOfTries += 1;
        } else if (GUESS_THE_NUMBER === randomNumber) {
            alert(`“You did it in ${amountOfTries} attempts. Congratulations!”`);
            break;
        }
    }
}

warmOrCold();