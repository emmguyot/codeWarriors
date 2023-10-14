function findShort(s){
    res = Number.MAX_VALUE;
    for (w of s.split(' ')) { 
        res = Math.min(w.length, res); 
    }
    return res;
}