function consoleCube() {
    const ASK_SYMBOLS = prompt('Enter any symbols, no more than 3 symbols');
    const ASK_NUMBER = prompt('Enter a number less than 10');

    let symbolsStorage = '';
    if (ASK_SYMBOLS.length > 3 || ASK_NUMBER > 10 || ASK_NUMBER < 0 || !isNaN(+ASK_SYMBOLS) || ASK_SYMBOLS === '' || ASK_NUMBER === '') {
        console.log('Incorrect input!');
        return symbolsStorage;
    }
    for (let iterator = 0; iterator < ASK_NUMBER; iterator++) {
        for (let counter = 0; counter < ASK_NUMBER; counter++) {
            symbolsStorage += `${ASK_SYMBOLS}`;
        }
        symbolsStorage += '\n';
    }
    console.log(symbolsStorage);
}

consoleCube();