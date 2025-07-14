/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

  const resultArray = [...arr];

  const dir = param === 'desc' ? -1 : 1;

  const compareFunc = function (a, b) {
    return a.localeCompare(b, ['ru', 'en'],
      {
        sensitivity: 'variant',
        caseFirst: 'upper'
      });
  };

  resultArray.sort((a, b) => dir * compareFunc(a, b));

  return resultArray;
}
