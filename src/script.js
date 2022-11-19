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
