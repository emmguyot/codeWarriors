function findOutlier(integers){
    searchEven = (Math.sign(integers[0])*integers[0]%2 + Math.sign(integers[1])*integers[1]%2 + Math.sign(integers[2])*integers[2]%2) >= 2;
    for (num of integers) {
        if (searchEven && num%2 === 0) return num;
        if (!searchEven && num%2 !== 0) return num;
    }
}