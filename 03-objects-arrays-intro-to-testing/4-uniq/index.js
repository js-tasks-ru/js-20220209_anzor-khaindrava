/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (arr === undefined){
    return []
  }
  let set = new Set;
  arr.forEach((el) => {
    set.add(el)
  });
  return Array.from(set);
}
