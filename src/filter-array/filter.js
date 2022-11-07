function customFilter(callback, thisArg) {
  let context = this;
  const objectFomAnArray = Object(this);
  if (arguments.length > 1) {
    context = thisArg;
  }
  const result = [];
  for (let iterator = 0; iterator < objectFomAnArray.length; iterator++) {
    if (iterator in objectFomAnArray) {
      if (
        callback.call(context, context[iterator], iterator, objectFomAnArray)
      ) {
        result.push(context[iterator]);
      }
    }
  }
  return result;
}
