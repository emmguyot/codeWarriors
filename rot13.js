    function rot13(str) {
        res = ""
        for (let c of str) {
            if ((c >= 'a') && (c <= 'z')) {
                start = 'a'.charCodeAt(0);
                res += String.fromCharCode(((c.charCodeAt(0)-start)+13)%26 + start)
            }
            else if ((c >= 'A') && (c <= 'Z')) {
                start = 'A'.charCodeAt(0);
                res += String.fromCharCode(((c.charCodeAt(0)-start)+13)%26 + start)
            }
            else {
                res += c;
            }
        }
        return res;
    }

console.log(rot13("test"))