document.addEventListener('DOMContentLoaded', app);

function app() {
  let calc = document.forms[0],
    isCalcing = false,
    error = '',
    value = 0,
    memory = 0,
    operator = '',
    exp = [],
    lastPart = '',
    lastOperand = 0,
    signs = /[\/\*\-\+]/,
    debug = false,
    action = (e) => {
      let tar = e.target || e,
        functionOperation = fnByKey(e.keyCode, e.shiftKey, e.altKey, e.metaKey),
        output = calc.output;
      if (e.keyCode === 13) e.preventDefault();
      else if (!functionOperation && !e.keyCode)
        functionOperation = tar.getAttribute('data-fn');
      if (functionOperation && output) {
        let maxLen = +output.maxLength,
          maxVal = 10 ** maxLen,
          fnIsNum = !isNaN(functionOperation),
          fnIsDec = functionOperation === '.',
          fnIsPct = functionOperation === '%',
          fnIsSqrt = functionOperation === 'sqrt',
          fnIsSign = functionOperation === '+-',
          recallOrClearM = functionOperation === 'mrc',
          subFromM = functionOperation === 'm-',
          addToM = functionOperation === 'm+',
          fnIsOp = '/*-+'.indexOf(functionOperation) > -1,
          fnIsEquals = functionOperation === '=',
          fnIsClear = functionOperation === 'C';
        if (!error) {
          if (exp.length) lastPart = exp[exp.length - 1];
          if (fnIsNum || fnIsDec || fnIsPct || fnIsSqrt || fnIsSign || fnIsOp) {
            if (!isCalcing) {
              isCalcing = true;
              if (fnIsNum || fnIsDec) {
                operator = '';
                exp = ['0'];
                lastPart = exp[0];
                lastOperand = 0;
              }
            }
            if (!exp.length) exp.push('0');
          }
          if (fnIsNum) {
            if (isNaN(lastPart)) {
              exp.push(functionOperation);
            } else if (lastPart.length < maxLen) {
              let numToAdd = lastPart + functionOperation;
              if (numToAdd[0] === '0' && numToAdd[1] !== '.')
                numToAdd = numToAdd.substr(1);
              exp[exp.length - 1] = numToAdd;
            }
          } else if (fnIsDec) {
            if (lastPart.indexOf('.') === -1) {
              if (isNaN(lastPart)) exp.push('0.');
              else if (lastPart.length < maxLen - 1)
                exp[exp.length - 1] += functionOperation;
            }
          } else if (fnIsPct) {
            if (exp.length) {
              if (!isNaN(lastPart)) {
                if (operator && exp.indexOf(operator) > -1) {
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
            if (memory !== 0 && memory === value) {
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
            operator = functionOperation;
            if (isNaN(lastPart)) {
              exp[exp.length - 1] = operator;
            } else {
              let curExp = exp.join(' ');
              if (signs.test(curExp)) {
                exp = [`${solve(exp[0], exp[1], exp[2])}`];
                exp[0] = nearestLastDecPt(exp[0]);
                lastPart = exp[0];
                value = lastPart;
              }
              exp.push(operator);
            }
            blink();
          } else {
            let memAction = subFromM || addToM;
            if (fnIsEquals || memAction) {
              isCalcing = false;
              if (operator && exp.indexOf(operator) > -1)
                lastOperand = lastPart;
              let compoundEquals = lastOperand && exp.indexOf(operator) === -1,
                normalEquals = !isNaN(lastOperand);
              if (compoundEquals) {
                if (!memAction) exp = [`${solve(value, op, lastOperand)}`];
              } else if (normalEquals) {
                exp = [`${solve(exp[0], operator, lastOperand)}`];
              } else {
                lastOperand = exp[0];
                exp = [`${solve(value, operator, value)}`];
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
          if (functionOperation !== 'C') {
            lastPart = exp[exp.length - 1];
            if (!isNaN(lastPart) || lastPart === 'NaN') value = lastPart;
            if (Math.abs(value) === Infinity || value === 'NaN') {
              error = '0';
            } else if (value <= -maxVal / 10) {
              let cutNeg = maxLen - 3;
              if (cutNeg < 0) cutNeg = 0;
              error = (value / maxVal).toFixed(cutNeg);
            } else if (value >= maxVal) {
              let cutPos = maxLen - 2;
              if (cutPos < 0) cutPos = 0;
              error = (value / maxVal).toFixed(cutPos);
            }
            let outputVal = error || String(value);
            if (!error) {
              if (
                (value >= -1e8 && value < -1e7) ||
                (value >= 1e8 && value < 1e9)
              )
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
          value = 0;
          if (Math.abs(memory) === Infinity || isNaN(memory)) {
            memory = 0;
            displayM(false);
          }
          operator = '';
          exp = [];
          lastPart = '';
          lastOperand = 0;
          output.value = value;
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
      let functionStorage = '';
      switch (keycode) {
        case 12:
        case 27:
        case 67:
          if (!isCmd) functionStorage = 'C';
          break;
        case 13:
          functionStorage = '=';
          break;
        case 48:
        case 96:
          functionStorage = '0';
          break;
        case 49:
        case 97:
          functionStorage = '1';
          break;
        case 50:
        case 98:
          functionStorage = '2';
          break;
        case 51:
        case 99:
          functionStorage = '3';
          break;
        case 52:
        case 100:
          functionStorage = '4';
          break;
        case 53:
        case 101:
          functionStorage = isShift ? '%' : '5';
          break;
        case 54:
        case 102:
          functionStorage = '6';
          break;
        case 55:
        case 103:
          functionStorage = '7';
          break;
        case 56:
          functionStorage = isShift ? '*' : '8';
          break;
        case 104:
          functionStorage = '8';
          break;
        case 57:
        case 105:
          functionStorage = '9';
          break;
        case 77:
          functionStorage = 'mrc';
          break;
        case 83:
          functionStorage = 'sqrt';
          break;
        case 106:
          functionStorage = '*';
          break;
        case 107:
          functionStorage = '+';
          break;
        case 187:
          functionStorage = isShift ? '+' : '=';
          break;
        case 188:
          functionStorage = isShift ? 'm-' : '';
          break;
        case 109:
        case 189:
          functionStorage = isAlt ? '+-' : '-';
          break;
        case 110:
          functionStorage = '.';
          break;
        case 190:
          functionStorage = isShift ? 'm+' : '.';
          break;
        case 111:
        case 191:
          functionStorage = '/';
          break;
        default:
          functionStorage = '';
          break;
      }
      return functionStorage;
    },
    kbdButtonPress = (e, state = 'down') => {
      let tar = e.target || e,
        functionOfKey = fnByKey(e.keyCode, e.shiftKey, e.altKey, e.metaKey),
        key = calc.querySelector(`[data-fn="${functionOfKey}"]`);

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
        res = Math.round(n / power) * power;
      return String(+res.toFixed(places));
    },
    solve = (firstnumber, operator, secondnumber) => {
      let calculationsResult = 0,
        firstNumber = !isNaN(firstnumber) ? +firstnumber : calculationsResult,
        secondNumber = !isNaN(secondnumber) ? +secondnumber : firstNumber;

      switch (operator) {
        case '/':
          calculationsResult = firstNumber / secondNumber;
          break;
        case '*':
          calculationsResult = firstNumber * secondNumber;
          break;
        case '-':
          calculationsResult = firstNumber - secondNumber;
          break;
        case '+':
          calculationsResult = firstNumber + secondNumber;
          break;
        default:
          calculationsResult = firstNumber;
          break;
      }
      return calculationsResult.toFixed(8);
    };

  calc.addEventListener('click', action);
  document.addEventListener('keydown', action);
  document.addEventListener('keydown', kbdButtonPress);
  document.addEventListener('keyup', (e) => kbdButtonPress(e, 'up'));
}
