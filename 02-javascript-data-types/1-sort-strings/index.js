/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let newArr = [];
  arr.forEach((el)=>{
    newArr.push(el)
  })

  newArr.sort(new Intl.Collator('ru-en',{localeMatcher:'best fit', sensitivity:'accent'}).compare).sort((a, b)=>{
    if(a.toLowerCase() === b.toLowerCase()){
      if(a[0]>b[0]){
        return 1;
      }
      return -1;
    }
  })
  return param === 'asc' ? newArr : newArr.reverse();
}

