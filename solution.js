function solution (roman) {
    // string roman numeral into an integer
    singleRomanToInt = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
    total = 0;
    previous = '';

    for (c of [...roman]) {
        if (previous == '') {
            previous = c;
        }
        else {
            if (singleRomanToInt[previous] >= singleRomanToInt[c]) {
                // Chiffre dans le sens normal
                total += singleRomanToInt[previous];
            }
            else {
                // Chiffre précédent est à retirer
                total -= singleRomanToInt[previous];
            }
            previous = c;
        }
    }

    // Vide le groupe
    if (previous != '') {
        total += singleRomanToInt[previous];
    }

	return total;
}