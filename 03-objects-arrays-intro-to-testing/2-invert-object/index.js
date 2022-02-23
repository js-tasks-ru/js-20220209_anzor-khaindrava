/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if(obj === undefined){
    return undefined;
  }
  let result = new Map();
  for (let item of Object.entries(obj)) {
    result.set(...item.reverse())
  }
  return Object.fromEntries(result);
}
