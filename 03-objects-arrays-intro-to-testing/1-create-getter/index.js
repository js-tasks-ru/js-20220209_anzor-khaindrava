/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let directories = path.split('.');
  return function (obj) {
    if (obj[directories[0]] === undefined) {
      return;
    }
    if(directories.length === 1){
      return obj[directories[0]];
    }
    function getItem(newObject,idx) {
      if(idx < directories.length && typeof newObject[directories[idx]] === 'object'){
        newObject = newObject[directories[idx]];
        idx++;
        return getItem(newObject, idx);
      }
      return newObject[directories[idx]];
    }
    return getItem(obj, 0);
  }
}
