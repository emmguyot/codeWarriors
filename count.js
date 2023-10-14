function count(string) {
    res = {};
    chars = [...string];
    for (c of chars) {
        if (res[c] === undefined) {
            res[c] = 1;
        }
        else {
            res[c]++;
        }
    }
    return res;
}