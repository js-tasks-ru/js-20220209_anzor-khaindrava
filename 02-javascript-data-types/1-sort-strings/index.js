/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let newArr = [...arr];
  let options = {
    localeMatcher:'best fit',
    sensitivity:'accent',
    caseFirst:'upper'
  };
  if(param === 'asc') {
    newArr.sort((a, b) => {
      return a.localeCompare(b,['ru', 'en'],options)
    }).sort((a ,b)=>{
      if(a.toLowerCase() === b.toLowerCase()){
        if(a[0]>b[0]){
          return 1;
        }
        return -1;
      }
    })
  }
  if(param === 'desc') {
    newArr.sort((a, b) => {
      return b.localeCompare(a,['ru', 'en'],options)
    }).sort((a ,b)=>{
      if(a.toLowerCase() === b.toLowerCase()){
        if(a[0]<b[0]){
          return 1;
        }
        return -1;
      }
    })
  }
  return newArr;
}

