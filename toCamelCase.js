function toCamelCase(str){
    words = str.split(/[-_]/);
    first = true;
    return words.map(x => { 
        if (first) { 
            first = false;
            return x.charAt(0) + x.substr(1).toLowerCase();;
        }
        else {
            return x.charAt(0).toUpperCase() + x.substr(1).toLowerCase();
        }
    }).join('');
}