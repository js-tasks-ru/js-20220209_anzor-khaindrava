/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if(size === 0){
    return '';
  }
  if (size === undefined) {
    return string;
  }
  let arr = Array.from(string);
  let count = 0;
  let resStr = '';
  arr.forEach((el,idx)=>{
    if(resStr[resStr.length-1] !== el ) {
      count = 1;
      resStr += el;
    } else {
      if(count < size){
        resStr += el;
        count++;
      }
    }
  })
  return resStr;
}
