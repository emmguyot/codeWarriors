function simplifiedDomain(str) {
    res = str.match("^www\.");
    if (res == null) res = str;
    else res = str.substring(4);

    const tldStart = res.lastIndexOf(".");
    if (res.length - tldStart > 3) {
        return res.substring(0, tldStart)
    }
    else {
        // Domain d'un pays
        const tld2Start = res.lastIndexOf(".", tldStart-1);
        if (tldStart - tld2Start > 3) {
            return res.substring(0, tldStart)
        }
        else {
            return res.substring(0, tld2Start)
        }
    }
}

function domainName(str){
    let start = str.indexOf("://") + 3;
    if (start == (-1 + 3)) start = 0
    const end = str.indexOf("/", start + 1);
    if (end != -1) {
        return simplifiedDomain(str.substring(start, end));
    }
    else {
        return simplifiedDomain(str.substring(start));
    }
}

console.log(domainName("www.xakep.ru"))