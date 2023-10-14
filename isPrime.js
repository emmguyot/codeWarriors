function isPrime(num) {
    if ((num <= 0) || (num == 1)) return false;
    if (num == 2) return true;

    if (num % 2 == 0) return false;

    limit = Math.sqrt(num) +0.5;
    step = 0;
    inc = 2;
    for (i = 3; i <= limit; i+=inc) {
        if (num % i === 0) {
            return false;
        }

        if (step == 2) {
            inc = 4;
            step = 1;
        }
        else {
            inc = 2;
            step++;
        }
    }
    return true;
}
 
console.log(isPrime(1847724737 ));