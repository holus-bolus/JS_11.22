function warmOrCold() {
    const FIRST_NUMBER = prompt('Enter a first number that is bigger than zero');
    const SECOND_NUMBER = prompt('Enter a second number that is bigger than zero');
    let firstNumberStorage = '';
    let secondNumberStorage = '';

    firstNumberStorage += FIRST_NUMBER;
    secondNumberStorage += SECOND_NUMBER;
    if (+FIRST_NUMBER < 0 || +SECOND_NUMBER < 0) {
        alert('Enter only positive numbers!');
    } else if ((+SECOND_NUMBER + 100) < +FIRST_NUMBER) {
        alert(`Please enter a number greater than ${+SECOND_NUMBER + 100}`);
    }

    let randomNumber = FIRST_NUMBER + Math.random() * (SECOND_NUMBER + 1 - FIRST_NUMBER);
    let integerNumber = Math.trunc(+randomNumber);
    const THIRD_NUMBER = +prompt('Enter a third number');
    if (THIRD_NUMBER === integerNumber) {

    }
}

warmOrCold();