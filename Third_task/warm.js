let iterationStorage = '';

function askFirstNumber() {
    let firstNumberStorage = parseInt('');
    let secondNumberStorage = parseInt('');
    while (true) {
        const ASK_FIRST_NUMBER = prompt("Enter a first number");
        firstNumberStorage += ASK_FIRST_NUMBER;
        if (ASK_FIRST_NUMBER < 0) {
            alert("Please enter only positive numbers");
            continue;
        } else if (isNaN(+ASK_FIRST_NUMBER)) {
            alert("Please enter a number");
            continue;
        }
        const ASK_SECOND_NUMBER = prompt("Enter a second number that bigger than first number for 100 points(`${+firstNumberStorage+100}`)");
        secondNumberStorage += ASK_SECOND_NUMBER;
        if (+ASK_SECOND_NUMBER < 0) {
            alert("Please enter only positive numbers");
        } else if (isNaN(+ASK_SECOND_NUMBER)) {
            alert("Please enter a number");
            continue;
        } else if ((+ASK_SECOND_NUMBER + 100) < firstNumberStorage) {
            alert(`Please enter a number greater than ${firstNumberStorage + 100}`)
        }
        let randomNumber = firstNumberStorage - 0.5 + Math.random() * (secondNumberStorage - firstNumberStorage + 1);
        let guessesStorage = parseInt('');
        const USER_GUESS = prompt("Enter a number and try to guess what number was conceived by the program");
        if (+USER_GUESS === randomNumber) {
            alert("Great! It'\s like you knew the number")
        } else if (+USER_GUESS < randomNumber) {
            alert("Cold");
            guessesStorage += 1;
            continue;
        } else if (+USER_GUESS - 1 < randomNumber) {
            alert("Colder");
            guessesStorage += 1;
            continue;
        } else {

        }
    }
}

askFirstNumber();