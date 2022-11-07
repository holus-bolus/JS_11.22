function createDebounceFunction(functionArgument, milliseconds) {
  let timeout;
  return function () {
    const functionCall = () => {
      functionArgument.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, milliseconds);
  };
}
