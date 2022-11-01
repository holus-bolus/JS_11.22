function askAUser() {
    const FIRST_NUMBER = prompt('Enter a first number');
    if (isNaN(+FIRST_NUMBER)) {
        console.log('Incorrect input!');
        return FIRST_NUMBER;
    }
    const SECOND_NUMBER = prompt('Enter a second number');
    if (isNaN(+SECOND_NUMBER)) {
        console.log('Incorrect input!');
        return SECOND_NUMBER;
    } else {
        console.log(`First number:${FIRST_NUMBER}. Second number:${SECOND_NUMBER}. Sum:${parseInt(FIRST_NUMBER)+ parseInt(SECOND_NUMBER)}. Product:${parseInt((FIRST_NUMBER)) * parseInt(SECOND_NUMBER)}. Power:${parseInt((FIRST_NUMBER)) ** parseInt(SECOND_NUMBER)}`)
    }
}

askAUser();