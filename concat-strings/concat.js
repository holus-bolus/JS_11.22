function checkTheString(value) {
  return typeof value === 'string';
}

function concatStrings(value, separator) {
  const validSeparator = checkTheString(separator) ? separator : '';
  return (next) => {
    if (!checkTheString(next) || !checkTheString(value)) {
      return value;
    }
    const result = `${value}${validSeparator}${next}`;
    return concatStrings(result, validSeparator);
  };
}
