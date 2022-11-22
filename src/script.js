document.addEventListener('DOMContentLoaded', app);

function app() {
  let calc = document.forms[0],
    isCalcing = false,
    error = '',
    val = 0,
    memory = 0,
    op = '',
    exp = [],
    lastPart = '',
    lastOperand = 0,
    signs = /[\/\*\-\+]/,
    debug = false,
    action = (e) => {
      let tar = e.target || e,
        fn = fnByKey(e.keyCode, e.shiftKey, e.altKey, e.metaKey),
        output = calc.output;
      if (e.keyCode === 13) e.preventDefault();
      else if (!fn && !e.keyCode) fn = tar.getAttribute('data-fn');
      if (fn && output) {
        let maxLen = +output.maxLength,
          maxVal = 10 ** maxLen,
          fnIsNum = !isNaN(fn),
          fnIsDec = fn === '.',
          fnIsPct = fn === '%',
          fnIsSqrt = fn === 'sqrt',
          fnIsSign = fn === '+-',
          recallOrClearM = fn === 'mrc',
          subFromM = fn === 'm-',
          addToM = fn === 'm+',
          fnIsOp = '/*-+'.indexOf(fn) > -1,
          fnIsEquals = fn === '=',
          fnIsClear = fn === 'C';
        if (!error) {
          if (exp.length) lastPart = exp[exp.length - 1];
          if (fnIsNum || fnIsDec || fnIsPct || fnIsSqrt || fnIsSign || fnIsOp) {
            if (!isCalcing) {
              isCalcing = true;
              if (fnIsNum || fnIsDec) {
                op = '';
                exp = ['0'];
                lastPart = exp[0];
                lastOperand = 0;
              }
            }
            if (!exp.length) exp.push('0');
          }
          if (fnIsNum) {
            if (isNaN(lastPart)) {
              exp.push(fn);
            } else if (lastPart.length < maxLen) {
              let numToAdd = lastPart + fn;
              if (numToAdd[0] === '0' && numToAdd[1] !== '.')
                numToAdd = numToAdd.substr(1);
              exp[exp.length - 1] = numToAdd;
            }
          } else if (fnIsDec) {
            if (lastPart.indexOf('.') === -1) {
              if (isNaN(lastPart)) exp.push('0.');
              else if (lastPart.length < maxLen - 1) exp[exp.length - 1] += fn;
            }
          } else if (fnIsPct) {
            if (exp.length) {
              if (!isNaN(lastPart)) {
                if (op && exp.indexOf(op) > -1) {
                  exp[exp.length - 1] = nearestLastDecPt(
                    (exp[0] * exp[exp.length - 1]) / 100
                  );
                } else {
                  exp[exp.length - 1] = nearestLastDecPt(
                    exp[exp.length - 1] / 100
                  );
                  isCalcing = false;
                }
              } else {
                exp.push(`${exp[0] * (exp[0] / 100)}`);
                exp[exp.length - 1] = nearestLastDecPt(exp[exp.length - 1]);
              }
            }
            blink();
          } else if (fnIsSqrt) {
            if (exp.length) {
              if (!isNaN(lastPart))
                exp[exp.length - 1] = String(Math.sqrt(exp[exp.length - 1]));
              else exp.push(String(Math.sqrt(exp[0])));
            }
            blink();
          } else if (fnIsSign) {
            if (exp.length) {
              if (!isNaN(lastPart))
                exp[exp.length - 1] = String(-exp[exp.length - 1]);
              else exp[0] = String(-exp[0]);
            }
          } else if (recallOrClearM) {
            if (memory !== 0 && memory === val) {
              if (exp.length <= 1) {
                isCalcing = false;
                memory = 0;
                displayM(false);
              }
            } else {
              if (!isCalcing) isCalcing = true;
              if (isNaN(lastPart) || !exp.length) exp.push(String(memory));
              else exp[exp.length - 1] = String(memory);
              lastPart = exp[exp.length - 1];
              lastOperand = lastPart;
              displayM(memory !== 0);
            }
          } else if (fnIsOp) {
            op = fn;
            if (isNaN(lastPart)) {
              exp[exp.length - 1] = op;
            } else {
              let curExp = exp.join(' ');
              if (signs.test(curExp)) {
                exp = [`${solve(exp[0], exp[1], exp[2])}`];
                exp[0] = nearestLastDecPt(exp[0]);
                lastPart = exp[0];
                val = lastPart;
              }
              exp.push(op);
            }
            blink();
          } else {
            let memAction = subFromM || addToM;
            if (fnIsEquals || memAction) {
              isCalcing = false;
              if (op && exp.indexOf(op) > -1) lastOperand = lastPart;
              let compoundEquals = lastOperand && exp.indexOf(op) === -1,
                normalEquals = !isNaN(lastOperand);
              if (compoundEquals) {
                if (!memAction) exp = [`${solve(val, op, lastOperand)}`];
              } else if (normalEquals) {
                exp = [`${solve(exp[0], op, lastOperand)}`];
              } else {
                lastOperand = exp[0];
                exp = [`${solve(val, op, val)}`];
              }
              exp[0] = nearestLastDecPt(exp[0]);
              if (memAction) {
                if (subFromM) memory -= +exp[0];
                if (addToM) memory += +exp[0];

                displayM(memory !== 0);
                if (debug) console.log(`M: ${m}`);
              }
              blink();
            }
          }
          if (fn !== 'C') {
            lastPart = exp[exp.length - 1];
            if (!isNaN(lastPart) || lastPart === 'NaN') val = lastPart;
            if (Math.abs(val) === Infinity || val === 'NaN') {
              error = '0';
            } else if (val <= -maxVal / 10) {
              let cutNeg = maxLen - 3;
              if (cutNeg < 0) cutNeg = 0;
              error = (val / maxVal).toFixed(cutNeg);
            } else if (val >= maxVal) {
              let cutPos = maxLen - 2;
              if (cutPos < 0) cutPos = 0;
              error = (val / maxVal).toFixed(cutPos);
            }
            let outputVal = error || String(val);
            if (!error) {
              if ((val >= -1e8 && val < -1e7) || (val >= 1e8 && val < 1e9))
                outputVal = outputVal.substr(0, maxLen - 1);
              else outputVal = outputVal.substr(0, maxLen);
            } else {
              displayE();
            }
            output.value = outputVal;
          }
        }
        if (fnIsClear) {
          if (debug) console.clear();
          isCalcing = false;
          error = '';
          val = 0;
          if (Math.abs(memory) === Infinity || isNaN(memory)) {
            memory = 0;
            displayM(false);
          }
          op = '';
          exp = [];
          lastPart = '';
          lastOperand = 0;
          output.value = val;
          blink();
          displayE(false);
        }
        if (debug) console.log(exp);
      }
    },
    blink = () => {
      let output = calc.output;
      if (output) {
        let fadeInClass = 'calc__screen--fade-in',
          screenCL = output.classList;

        screenCL.remove(fadeInClass);
        void output.offsetWidth;
        setTimeout(() => {
          screenCL.add(fadeInClass);
        }, 0);
      }
    },
    displayE = (show = true) => {
      let ce = calc.querySelector('.calc__error');
      ce.textContent = show ? 'E' : '';
    },
    displayM = (show = true) => {
      let cm = calc.querySelector('.calc__memory');
      cm.textContent = show ? 'M' : '';
    },
    fnByKey = (keycode, isShift, isAlt, isCmd) => {
      let fn = '';
      switch (keycode) {
        case 12:
        case 27:
        case 67:
          if (!isCmd) fn = 'C';
          break;
        case 13:
          fn = '=';
          break;
        case 48:
        case 96:
          fn = '0';
          break;
        case 49:
        case 97:
          fn = '1';
          break;
        case 50:
        case 98:
          fn = '2';
          break;
        case 51:
        case 99:
          fn = '3';
          break;
        case 52:
        case 100:
          fn = '4';
          break;
        case 53:
        case 101:
          fn = isShift ? '%' : '5';
          break;
        case 54:
        case 102:
          fn = '6';
          break;
        case 55:
        case 103:
          fn = '7';
          break;
        case 56:
          fn = isShift ? '*' : '8';
          break;
        case 104:
          fn = '8';
          break;
        case 57:
        case 105:
          fn = '9';
          break;
        case 77:
          fn = 'mrc';
          break;
        case 83:
          fn = 'sqrt';
          break;
        case 106:
          fn = '*';
          break;
        case 107:
          fn = '+';
          break;
        case 187:
          fn = isShift ? '+' : '=';
          break;
        case 188:
          fn = isShift ? 'm-' : '';
          break;
        case 109:
        case 189:
          fn = isAlt ? '+-' : '-';
          break;
        case 110:
          fn = '.';
          break;
        case 190:
          fn = isShift ? 'm+' : '.';
          break;
        case 111:
        case 191:
          fn = '/';
          break;
        default:
          fn = '';
          break;
      }
      return fn;
    },
    kbdButtonPress = (e, state = 'down') => {
      let tar = e.target || e,
        fn = fnByKey(e.keyCode, e.shiftKey, e.altKey, e.metaKey),
        key = calc.querySelector(`[data-fn="${fn}"]`);

      if (key) {
        let activeClass = 'calc__btn--active',
          keyCL = key.classList;

        if (state === 'down' && !keyCL.contains(activeClass))
          keyCL.add(activeClass);
        else if (state === 'up' && keyCL.contains(activeClass))
          keyCL.remove(activeClass);
      }
    },
    nearestLastDecPt = (n, places = 9) => {
      let power = 10 ** -places,
        r = Math.round(n / power) * power;
      return String(+r.toFixed(places));
    },
    solve = (A, op, B) => {
      let r = 0,
        a = !isNaN(A) ? +A : r,
        b = !isNaN(B) ? +B : a;

      switch (op) {
        case '/':
          r = a / b;
          break;
        case '*':
          r = a * b;
          break;
        case '-':
          r = a - b;
          break;
        case '+':
          r = a + b;
          break;
        default:
          r = a;
          break;
      }
      return r;
    };

  calc.addEventListener('click', action);
  document.addEventListener('keydown', action);
  document.addEventListener('keydown', kbdButtonPress);
  document.addEventListener('keyup', (e) => kbdButtonPress(e, 'up'));
}
