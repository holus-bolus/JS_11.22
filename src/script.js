let screen = document.querySelector('#screen');
let btn = document.querySelectorAll('.btn');

for (let item of btn) {
  item.addEventListener('click', (e) => {
    let btnText = e.target.innerText;
    screen.value += btnText;
  });
}
function sin() {
  screen.value = Math.sin(screen.value).toFixed(8);
}
function cos() {
  screen.value = Math.cos(screen.value).toFixed(8);
}
function tan() {
  screen.value = Math.tan(screen.value).toFixed(8);
}
function log() {
  screen.value = Math.log(screen.value).toFixed(8);
}
function e() {
  screen.value = Math.E.toFixed(8);
}
function pi() {
  screen.value = Math.PI.toFixed(8);
}
function pow() {
  screen.value = Math.pow(screen.value, 2).toFixed(8);
}
function sqrt() {
  screen.value = Math.sqrt(screen.value).toFixed(8);
}
function fact() {
  let i, num, f;
  f = 1;
  num = screen.value;
  for (i = 1; i < num; i++) {
    f *= i;
  }
  i -= 1;
  screen.value = f;
}
function backspc() {
  screen.value = screen.value.substr(0, screen.value.length - 1);
}

document.addEventListener('keydown', keyboardInputHandler);

function keyboardInputHandler(e) {
  let res = document.querySelector('#screen');
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
  } else if (e.key === '(') {
    res.value += '(';
  } else if (e.key === ')') {
    res.value += ')';
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
