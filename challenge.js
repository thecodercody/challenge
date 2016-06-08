var recursor = function(arr){
  if(arr.length === 0){
    return arr;
  }  
  if(arr[0] % 2 === 0){
    return [arr[0]].concat(recursor(arr.slice(1)));
  } else {
    return recursor(arr.slice(1));
  }
}