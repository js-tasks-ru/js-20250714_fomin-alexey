/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {

  const resultObject = {};

  // Копирую объект чтобы избежать изменения объект obj
  for (const key in obj) {
    resultObject[key] = obj[key];
  }

  for (const field of fields) {
    delete resultObject[field];
  }

  return resultObject;
};
