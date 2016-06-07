var results = [];
var arr = [1,2,3,4,5,6,7,8,9,10]

var recursor = function (i) {
  if(i === arr.length) {
    return results;
  } else {
    if(arr[i] % 2 === 0){
      results.push(arr[i]);
    }
  }

  recursor(i + 1);

}

recursor(0);
console.log(results);
