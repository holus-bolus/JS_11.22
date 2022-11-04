function makeDeepCopy(object) {
    if (typeof object !== 'object' || object === null) {
        throw new Error('It\'s not an object');
    }
    let clonedObject = {};
    for (let iterator in object) {
        if (typeof (object[iterator]) == 'object' && object[iterator] !== null) {
            clonedObject [iterator] = makeDeepCopy(object[iterator]);
        } else {
            clonedObject [iterator] = object[iterator];
        }
    }
    return clonedObject;
}
