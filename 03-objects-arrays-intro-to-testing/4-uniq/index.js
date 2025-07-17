/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {

  const arrayToSet = (arr) => new Set(arr);
  const setToArray = (set) => [...set];

  return setToArray(arrayToSet(arr));
}
