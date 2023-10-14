function alphanumeric(string){
  return /^[a-zA-Z0-9]+$/.test(string);
}

console.log(alphanumeric("Mazinkaiser"));