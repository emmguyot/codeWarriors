function bubble(arr) {

    let res = [];
    let changed = false;
    do {
        changed = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i+1]) {
                changed = true;
                const before = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = before;
                res.push(arr.slice());
            }
        }
    } while (changed);

    return res;
}

console.log(JSON.stringify(bubble([1,4,3,6,7,9,2,5,8])));