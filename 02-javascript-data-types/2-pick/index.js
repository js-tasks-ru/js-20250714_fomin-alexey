/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let resultObject = {};

  for (const field of fields) {
    if (field in obj) {
      resultObject[field] = obj[field];
    }
  }

  return resultObject;
};
