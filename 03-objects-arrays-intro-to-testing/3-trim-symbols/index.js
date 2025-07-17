/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string.length === 0) {return string;}
  if (size === undefined) {return string;}

  let result = '';
  let currentChar = string[0];
  let count = 1;

  for (let i = 1; i < string.length; i++) {
    if (string[i] === currentChar) {
      count++;
    } else {
      result += currentChar.repeat(Math.min(count, size));
      currentChar = string[i];
      count = 1;
    }
  }

  result += currentChar.repeat(Math.min(count, size));

  return result;
}
