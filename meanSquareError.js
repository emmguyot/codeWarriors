var solution = function(firstArray, secondArray) {
    // Sanity check
    if (firstArray.length != secondArray.length) return -1;

    let sum = 0;
    for (i=0; i < firstArray.length; i++) {
        sum += (firstArray[i] - secondArray[i])**2;
    }

    return sum / firstArray.length;
}