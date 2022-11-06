/**
 *
 * @param {Object|Array} object
 * @returns {Object|Array}
 */

function makeDeepCopy(object) {
  if (typeof object !== 'object' || object === null || object === 'undefined') {
    throw new Error("It's not an object");
  }
  if (Array.isArray(object)) {
    return object.map((item) => {
      if (item instanceof Object) return makeDeepCopy(item);
      return item;
    });
  }
  const clonedObject = {};
  Object.assign(clonedObject, object);
  Object.entries(object).forEach(([key, value]) => {
    if (value instanceof Object) {
      clonedObject[key] = makeDeepCopy(value);
    } else {
      clonedObject[key] = value;
    }
  });
  return clonedObject;
}
