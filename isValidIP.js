function isValidIP(str) {
    re = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/
    matches = str.match(re);
    return ((matches !== null) && (matches[1] <= 255) && (matches[2] <= 255) && (matches[3] <= 255) && (matches[4] <= 255))
        && (! matches[1].startsWith("0") || matches[1] === "0")
        && (! matches[2].startsWith("0") || matches[2] === "0")
        && (! matches[3].startsWith("0") || matches[3] === "0")
        && (! matches[4].startsWith("0") || matches[4] === "0");
}

console.log(isValidIP("0.0.0.0"));