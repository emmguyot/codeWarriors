function toWeirdCase(str) {
    res = "";
    countInWord = -1;
    for (let c of str) {
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            if (++countInWord % 2 == 0) {
                res += c.toUpperCase();
            }
            else {
                res += c.toLowerCase();
            }
        }
        else {
            res+=c;
            countInWord = -1;
        }
    }
    return res;
}

console.log(toWeirdCase("String"))