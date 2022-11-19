function insert(num) {
  document.form.textview.value = document.form.textview.value + num;
  if (document.form.textview.value === 0 && num === 0) {
    document.form.textview.value = '';
  }
}

function clearInput() {
  document.form.textview.value = '';
}

function deleteANumber() {
  let expression = document.form.textview.value;
  document.form.textview.value = expression.substring(0, expression.length - 1);
}

function calculateAResult() {
  let expression = document.form.textview.value;
  if (expression) {
    document.form.textview.value = eval(expression);
  }
}

function reverseANumber() {
  let expression = document.form.textview.value;
  document.form.textview.value = parseInt(expression) * -1;
}

document.addEventListener('keydown', keyboardInputHandler);

function keyboardInputHandler(e) {
  let res = document.querySelector('.input');
  if (e.key === '0') {
    res.value += '0';
  } else if (e.key === '1') {
    res.value += '1';
  } else if (e.key === '2') {
    res.value += '2';
  } else if (e.key === '3') {
    res.value += '3';
  } else if (e.key === '4') {
    res.value += '4';
  } else if (e.key === '5') {
    res.value += '5';
  } else if (e.key === '6') {
    res.value += '6';
  } else if (e.key === '7') {
    res.value += '7';
  } else if (e.key === '8') {
    res.value += '8';
  } else if (e.key === '9') {
    res.value += '9';
  }

  if (e.key === '+') {
    res.value += '+';
  } else if (e.key === '-') {
    res.value += '-';
  } else if (e.key === '*') {
    res.value += '*';
  } else if (e.key === '/') {
    res.value += '/';
  } else if (e.key === '%') {
    res.value += '%';
  }

  if (e.key === '.') {
    res.value += '.';
  }
  if (e.key === 'Enter') {
    res.value = eval(res.value || null);
  }

  if (e.key === 'Backspace') {
    let resultInput = res.value;
    res.value = resultInput.substring(0, res.value.length - 1);
  }
}
