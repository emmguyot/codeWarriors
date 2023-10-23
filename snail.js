snail = function(array) {
    if (array.length == 0) return [];
    if (array.length == 1) return array.shift();
    let res = array.shift();
    let gauche = [];
    let fin = array.pop();
    let core = [];

    array.forEach(ligne => {
        res.push(ligne.pop());
        gauche.push(ligne.shift());
        core.push(ligne);
    });

    res = res.concat(fin.reverse()).concat(gauche.reverse());

    return res.concat(snail(core));
}

console.log(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));

console.log(snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]));