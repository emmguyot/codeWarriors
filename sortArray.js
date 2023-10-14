function compareNumbers(a, b) {
    return a - b;
}
  
function sortArray(array) {
    // Return a sorted array.
    let oddNumbers = [];
    for (i = 0; i < array.length; i++) {
        if (Math.sign(array[i])*array[i]%2 == 1) oddNumbers.push(array[i]);
    }
    oddNumbers.sort(compareNumbers);
    for (i = 0, j = 0; i < array.length; i++) {
        if (Math.sign(array[i])*array[i]%2 == 1) array[i] = oddNumbers[j++];
    }
    return array;
}