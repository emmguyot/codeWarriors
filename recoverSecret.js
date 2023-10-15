function lettreConnuAutour(lettre, hardToFind, letters, testedLetter = [])  {
    let lettresAutour = hardToFind[lettre];

    if (! testedLetter.includes(lettre)) {
        testedLetter.push(lettre);
        if (lettresAutour[0] in hardToFind) {
             let nLettresAutour = lettreConnuAutour(lettresAutour[0], hardToFind, letters, testedLetter)
             if ((nLettresAutour != false) && (letters.indexOf(nLettresAutour[0]) > letters.indexOf(lettresAutour[0]))) {
                lettresAutour[0] = nLettresAutour[0];
             }
        }
        if (lettresAutour[1] in hardToFind) {
            let nLettresAutour = lettreConnuAutour(lettresAutour[1], hardToFind, letters, testedLetter);
            if ((nLettresAutour != false) && (letters.indexOf(nLettresAutour[1]) < letters.indexOf(lettresAutour[1]))) {
                lettresAutour[1] = nLettresAutour[1];
            }
        }
        return lettresAutour;
    }
    return false;
}

function optimizedLeftPosition (letter, leftLetter, pos0, letters, hardToFind) {
    if ((letter in hardToFind) && (hardToFind[letter][0] != ' ')) {
        let lettresAutour = lettreConnuAutour(letter, hardToFind, letters);
        if (lettresAutour != false) {
            let posAvant = letters.indexOf(lettresAutour[0]);

            if (posAvant < pos0) {
                hardToFind[letter][0] = leftLetter;
            }
            else {
                return {'pos': posAvant, 'letter': lettresAutour[0]};
            }
        }
    }
    else if ((letter in hardToFind) && (hardToFind[letter][0] == ' ')) {
        hardToFind[letter][0] = leftLetter;
    }

    return {'pos': pos0, 'letter': letter};
}

function optimizedRightPosition (letter, rightLetter, pos2, letters, hardToFind) {
    if ((letter in hardToFind) && (hardToFind[letter][1] != ' ')) {
        let lettresAutour = lettreConnuAutour(letter, hardToFind, letters);
        if (lettresAutour != false) {
            let posAprès = letters.indexOf(lettresAutour[1]);

            if ((posAprès > pos2) && (pos2 != -1)) {
                hardToFind[letter][1] = rightLetter;
            }
            else {
                return {'pos': posAprès, 'letter': lettresAutour[1]};
            }
        }
    }
    else if ((letter in hardToFind) && (hardToFind[letter][1] == ' ')) {
        hardToFind[letter][1] = rightLetter;
    }

    return {'pos': pos2, 'letter': letter};
}


function placeLetter (left, center, right, pos0, pos1, pos2, letters, hardToFind) {
    if ((pos0 != -1) && (pos2 != -1) && (pos0 == pos2 - 1) && (pos1 == -1)) {
        // Insert the letter between
        letters.splice(pos2, 0, center);
        delete hardToFind[center];
        return true;
    }
    else if ((pos0 == -1) && (pos1 == -1) && (pos2 == 0)) {
        // Insert the letters at beginning
        letters.unshift(center);
        letters.unshift(left);
        delete hardToFind[center];
        delete hardToFind[left];
        return true;
    }
    else if ((pos0 == -1) && (pos1 == 0)) {
        // Insert the letter at beginning
        letters.unshift(left);
        delete hardToFind[left];
        return true;
    }
    else if ((pos2 == -1) && (pos1 == -1) && (pos0 == (letters.length -1))) {
        // Insert the letters at the end
        letters.push(center);
        letters.push(right);
        delete hardToFind[center];
        delete hardToFind[right];
        return true;
    }
    else if ((pos2 == -1) && (pos1 == (letters.length -1))) {
        // Insert the letter at the end
        letters.push(right);
        delete hardToFind[right];
        return true;
    }
    return false;
}

var recoverSecret = function(triplets) {
    let letters=[triplets[0][0],triplets[0][1],triplets[0][2]];
    let tryAgain=[];
    let hardToFind=[];

    let totalTries = 0;

    do {
        tryAgain=[];
        totalTries++; // TODO Debug intervertion du h
        for (i=1; i < triplets.length; i++) {
            let pos0 = letters.indexOf(triplets[i][0]);
            let pos1 = letters.indexOf(triplets[i][1]);
            let pos2 = letters.indexOf(triplets[i][2]);

            if (!placeLetter(triplets[i][0], triplets[i][1], triplets[i][2], pos0, pos1, pos2, letters, hardToFind)
                    && ((pos0 == -1) || (pos1 == -1) || (pos2 == -1))) {
                // Search with optimized Positions
                tryAgain.push(triplets[i]);

                if (pos1 == -1) {
                    if (! (triplets[i][1] in hardToFind)) hardToFind[triplets[i][1]] = [triplets[i][0], triplets[i][2]];
                    let {pos:nPos0, letter:leftLetter} = optimizedLeftPosition(triplets[i][1], triplets[i][0], pos0, letters, hardToFind);
                    let {pos:nPos2, letter:rightLetter} = optimizedRightPosition(triplets[i][1], triplets[i][2], pos2, letters, hardToFind);

                    if (placeLetter(leftLetter, triplets[i][1], rightLetter, nPos0, pos1, nPos2, letters, hardToFind)) {
                        continue;
                    }
                }
                if (pos0 == -1) {
                    if (! (triplets[i][0] in hardToFind)) hardToFind[triplets[i][0]] = [' ', triplets[i][1]];
                    if ((pos1 != -1) || (pos2 == -1)) {
                        let {pos:nPos1, letter:rightLetter} = optimizedRightPosition(triplets[i][0], triplets[i][1], pos1, letters, hardToFind);
                        if (placeLetter(triplets[i][0], rightLetter, '!', pos0, nPos1, 5000, letters, hardToFind)) {
                            continue;
                        }
                    }
                    else {
                        let {pos:nPos2, letter:rightLetter} = optimizedRightPosition(triplets[i][0], triplets[i][2], pos2, letters, hardToFind);
                        if (placeLetter(triplets[i][0], rightLetter, '!', pos0, nPos2, 5000, letters, hardToFind)) {
                            continue;
                        }
                    }
                }
                if (pos2 == -1) {
                    if (! (triplets[i][2] in hardToFind)) hardToFind[triplets[i][2]] = [triplets[i][1], ' '];
                    if ((pos1 != -1) || (pos0 == -1)) {
                        let {pos:nPos1, letter:leftLetter} = optimizedLeftPosition(triplets[i][2], triplets[i][1], pos1, letters, hardToFind);
                        placeLetter('!', leftLetter, triplets[i][2], -5000, nPos1, pos2, letters, hardToFind);
                    }
                    else {
                        let {pos:nPos0, letter:leftLetter} = optimizedLeftPosition(triplets[i][2], triplets[i][0], pos0, letters, hardToFind);
                        placeLetter(leftLetter, triplets[i][2], '!', nPos0, pos2, 5000, letters, hardToFind);
                    }

                }
            }
//            console.log("letters",letters);
//            console.log("HardToFind",hardToFind);
        }
    } while ((tryAgain.length > 0) && (totalTries < 1000));

    return letters.reduce((accumulator, currentValue) => accumulator + currentValue, "")
}

if (true) console.log(recoverSecret([
    [ 'o', 'x', 'y' ], [ 'h', 'r', 'u' ], [ 'b', 'x', 'z' ], [ 'r', 'y', 'z' ],
    [ 'v', 'y', 'z' ], [ 'v', 'w', 'y' ], [ 'o', 's', 'y' ], [ 'i', 'u', 'z' ],
    [ 'q', 'y', 'z' ], [ 'k', 'p', 'v' ], [ 'w', 'x', 'z' ], [ 'k', 'x', 'y' ],
    [ 'r', 'w', 'x' ], [ 'a', 'n', 'w' ], [ 'b', 'd', 't' ], [ 'p', 'u', 'y' ],
    [ 'n', 'v', 'z' ], [ 'f', 'k', 'q' ], [ 'i', 'm', 'z' ], [ 'a', 'w', 'y' ],
    [ 'b', 'k', 'n' ], [ 't', 'u', 'w' ], [ 'x', 'y', 'z' ], [ 'f', 'g', 'j' ],
    [ 'n', 'y', 'z' ], [ 's', 'y', 'z' ], [ 'k', 'w', 'x' ], [ 'm', 's', 'u' ],
    [ 'h', 'i', 's' ], [ 'q', 'w', 'z' ], [ 'w', 'y', 'z' ], [ 'j', 'o', 'p' ],
    [ 'r', 'v', 'y' ], [ 'h', 'p', 'w' ], [ 's', 't', 'z' ], [ 'j', 'k', 'r' ],
    [ 'n', 'u', 'w' ], [ 'h', 'v', 'w' ], [ 't', 'u', 'y' ], [ 'l', 'q', 'y' ],
    [ 'v', 'w', 'x' ], [ 'r', 'w', 'z' ], [ 'm', 'o', 'w' ], [ 'k', 'q', 'x' ],
    [ 'e', 'h', 'r' ], [ 'e', 'k', 'l' ], [ 'd', 'h', 'p' ], [ 'r', 'u', 'w' ],
    [ 'e', 'g', 'n' ], [ 'm', 'o', 'y' ], [ 'q', 'r', 's' ], [ 'd', 'i', 'q' ],
    [ 'u', 'w', 'z' ], [ 'u', 'w', 'x' ], [ 'u', 'x', 'z' ], [ 'e', 'l', 'x' ],
    [ 'p', 't', 'v' ], [ 'k', 't', 'w' ], [ 'v', 'x', 'y' ], [ 'f', 'y', 'z' ],
    [ 'v', 'w', 'z' ], [ 'd', 'f', 'h' ], [ 'h', 't', 'x' ], [ 'c', 'w', 'x' ],
    [ 'v', 'x', 'z' ], [ 'f', 'p', 'x' ], [ 'g', 'x', 'y' ], [ 'g', 'v', 'w' ],
    [ 'f', 'l', 's' ], [ 'c', 'f', 'v' ], [ 'g', 'q', 's' ], [ 'd', 't', 'y' ],
    [ 'j', 'p', 't' ], [ 'd', 'k', 's' ], [ 's', 'w', 'x' ], [ 'd', 'q', 'x' ],
    [ 'o', 'r', 's' ], [ 'l', 'v', 'y' ], [ 'r', 't', 'y' ], [ 'i', 'y', 'z' ],
    [ 'g', 'r', 'w' ], [ 'g', 'h', 'l' ], [ 'c', 'x', 'z' ], [ 'g', 't', 'v' ],
    [ 'f', 'g', 'n' ], [ 'l', 'r', 't' ], [ 'r', 'u', 'x' ], [ 'u', 'x', 'y' ],
    [ 's', 'x', 'y' ], [ 'b', 'u', 'z' ], [ 'l', 'w', 'y' ], [ 'a', 'n', 'v' ],
    [ 'k', 'l', 'z' ], [ 'n', 'q', 'w' ], [ 'm', 'u', 'z' ], [ 'k', 'u', 'y' ],
    [ 't', 'v', 'z' ], [ 'o', 'w', 'z' ], [ 'c', 'h', 'y' ], [ 'h', 's', 'y' ],
    [ 'l', 'r', 'z' ], [ 'a', 's', 'z' ], [ 'f', 'r', 'v' ], [ 'd', 'q', 'v' ],
    [ 'u', 'v', 'y' ], [ 't', 'x', 'y' ], [ 'b', 'w', 'y' ], [ 'j', 'q', 'u' ],
    [ 'o', 't', 'y' ], [ 'p', 'y', 'z' ], [ 'l', 'y', 'z' ], [ 'n', 's', 'u' ],
    [ 'm', 's', 'x' ], [ 'b', 's', 'y' ], [ 'l', 's', 'z' ], [ 'd', 'm', 'u' ],
    [ 'i', 'o', 'w' ], [ 'c', 'v', 'w' ], [ 't', 'y', 'z' ], [ 'l', 'n', 'y' ],
    [ 'm', 'x', 'y' ], [ 'n', 'v', 'x' ], [ 'n', 'u', 'z' ], [ 'g', 'h', 's' ],
    [ 'r', 'v', 'w' ], [ 'j', 'u', 'x' ], [ 'm', 'v', 'z' ], [ 'd', 'r', 'z' ],
    [ 'o', 'v', 'x' ], [ 'f', 'n', 'q' ], [ 'a', 'b', 't' ], [ 'h', 'v', 'x' ],
    [ 'e', 'u', 'x' ], [ 'o', 'w', 'y' ], [ 'd', 'i', 'm' ], [ 'a', 'f', 'w' ],
    [ 'f', 'n', 'r' ], [ 'd', 'm', 'x' ], [ 'p', 'r', 'z' ], [ 'p', 'u', 'v' ],
    [ 'e', 'y', 'z' ], [ 'c', 'o', 'x' ], [ 'c', 'x', 'y' ], [ 'a', 'i', 'w' ],
    [ 'q', 'x', 'y' ], [ 'c', 'i', 'n' ], [ 'u', 'v', 'z' ], [ 'u', 'w', 'y' ],
    [ 'f', 'r', 'x' ], [ 't', 'w', 'z' ], [ 'e', 'r', 'v' ], [ 'o', 'q', 't' ],
    [ 'm', 'w', 'x' ], [ 'g', 'v', 'x' ], [ 'c', 'j', 'k' ], [ 'i', 's', 'y' ],
    [ 'g', 's', 'u' ], [ 'i', 'j', 's' ], [ 'd', 'm', 'n' ], [ 'l', 'n', 'v' ],
    [ 'e', 's', 'w' ], [ 'o', 'u', 'w' ], [ 'b', 's', 'z' ], [ 'a', 'd', 'g' ],
    [ 'l', 'w', 'x' ], [ 'm', 'r', 'x' ], [ 'j', 'k', 'l' ], [ 'f', 'p', 's' ],
    [ 'p', 'r', 'v' ], [ 'g', 'x', 'z' ], [ 'o', 'u', 'z' ], [ 'h', 'k', 's' ],
    [ 'i', 'r', 'w' ], [ 'n', 'q', 'y' ], [ 'o', 'q', 'r' ], [ 'f', 'q', 'y' ],
    [ 'e', 'j', 'z' ], [ 'e', 'o', 'u' ], [ 'j', 'k', 'z' ], [ 'b', 'g', 't' ],
    [ 'f', 'v', 'w' ], [ 'w', 'x', 'y' ], [ 't', 'v', 'w' ], [ 'a', 'p', 'w' ],
    [ 'c', 'l', 'x' ], [ 'q', 's', 'y' ], [ 'k', 'n', 'q' ], [ 'd', 'y', 'z' ],
    [ 'i', 'p', 'v' ], [ 'e', 'k', 'y' ], [ 'e', 'w', 'z' ], [ 'i', 'm', 'v' ],
    [ 'j', 's', 'v' ], [ 'l', 'o', 'u' ], [ 'e', 'o', 'q' ], [ 'a', 'i', 's' ],
    [ 'e', 'm', 'y' ], [ 'b', 'y', 'z' ], [ 'c', 'k', 'u' ], [ 'a', 'k', 'p' ],
    [ 'p', 'x', 'y' ], [ 'h', 'p', 'q' ], [ 'p', 't', 'w' ], [ 'e', 'x', 'z' ],
    [ 'l', 'p', 'y' ], [ 'm', 'y', 'z' ], [ 'l', 't', 'v' ], [ 'd', 'g', 'n' ],
    [ 'h', 'o', 't' ], [ 'c', 't', 'x' ], [ 'a', 'o', 'v' ], [ 'm', 'v', 'x' ],
    [ 'k', 'o', 'q' ], [ 'i', 'v', 'y' ], [ 'b', 'm', 's' ], [ 'h', 'q', 'w' ],
    [ 'f', 'h', 'x' ], [ 'i', 'v', 'z' ], [ 'f', 't', 'w' ], [ 'l', 'v', 'z' ],
    [ 'f', 'g', 'w' ], [ 's', 'w', 'z' ], [ 'j', 'k', 'o' ], [ 'd', 'j', 'm' ],
    [ 'r', 't', 'u' ], [ 'k', 'm', 'z' ], [ 'q', 'w', 'y' ], [ 'q', 'u', 'v' ],
    [ 'g', 's', 'x' ], [ 'p', 's', 't' ], [ 'i', 'm', 't' ], [ 'c', 'g', 'y' ],
    [ 'n', 'w', 'z' ], [ 'o', 'r', 'z' ], [ 'h', 'i', 'm' ], [ 'n', 't', 'w' ],
    [ 's', 'u', 'y' ], [ 's', 'x', 'z' ], [ 'h', 'x', 'z' ], [ 'e', 'f', 'x' ],
    [ 'a', 'k', 'n' ], [ 'h', 's', 'z' ], [ 'j', 'o', 'w' ], [ 'o', 't', 'x' ],
    [ 'l', 'n', 'r' ], [ 'm', 'x', 'z' ], [ 'r', 'x', 'y' ], [ 'b', 'w', 'z' ],
    [ 'c', 'j', 'q' ], [ 'b', 'f', 'o' ], [ 'o', 'x', 'z' ], [ 'i', 'j', 'r' ],
    [ 'p', 'q', 'y' ], [ 'j', 'p', 's' ], [ 'm', 'r', 'w' ], [ 'a', 'e', 'y' ],
    [ 'u', 'y', 'z' ], [ 'j', 'l', 'u' ], [ 'j', 's', 'y' ], [ 'k', 'x', 'z' ],
    [ 'p', 'v', 'y' ], [ 'j', 'l', 'p' ], [ 'p', 'v', 'z' ], [ 'f', 'h', 't' ],
    [ 'k', 'n', 'x' ], [ 'f', 'n', 'o' ], [ 'p', 'v', 'w' ], [ 'k', 'v', 'y' ],
    [ 'j', 'w', 'y' ], [ 'e', 'n', 's' ], [ 'f', 'j', 'p' ], [ 'f', 'u', 'w' ],
    [ 'g', 'm', 'z' ], [ 'n', 's', 'y' ], [ 'm', 's', 'z' ], [ 'c', 'd', 'x' ],
    [ 'l', 'x', 'y' ], [ 'g', 'y', 'z' ], [ 'b', 't', 'w' ], [ 'n', 'q', 'z' ],
    [ 'r', 'w', 'y' ], [ 'r', 't', 'w' ], [ 'l', 't', 'x' ], [ 'm', 'w', 'y' ],
    [ 'h', 'm', 't' ], [ 'k', 'n', 'v' ], [ 'a', 'j', 'y' ], [ 'f', 'q', 'w' ],
    [ 's', 'u', 'w' ], [ 'p', 't', 'z' ], [ 'j', 'l', 'r' ], [ 'm', 'n', 'w' ],
    [ 'n', 't', 'v' ], [ 'n', 'p', 'r' ], [ 'l', 'u', 'w' ], [ 'g', 'j', 'o' ],
    [ 'b', 'j', 'v' ], [ 'm', 'o', 't' ], [ 'k', 'w', 'z' ], [ 'f', 'i', 'n' ],
    [ 'i', 'u', 'y' ], [ 'p', 'v', 'x' ], [ 'k', 'l', 'u' ], [ 'b', 'c', 'f' ],
    [ 'f', 'q', 'v' ], [ 'c', 'h', 'u' ], [ 'i', 'n', 'w' ], [ 'q', 's', 't' ],
    [ 'k', 'q', 'w' ], [ 'o', 'q', 's' ], [ 'o', 'r', 'v' ], [ 'm', 't', 'u' ],
    [ 'n', 'u', 'y' ], [ 'c', 's', 'z' ], [ 'o', 'q', 'x' ], [ 'r', 't', 'z' ],
    [ 'a', 'g', 'q' ], [ 'g', 's', 'z' ], [ 'i', 'w', 'y' ], [ 'j', 'l', 'y' ],
    [ 'e', 'v', 'x' ], [ 'e', 'n', 't' ], [ 'f', 'g', 'v' ], [ 'a', 'j', 'n' ],
    [ 'd', 'h', 'r' ], [ 'a', 'p', 'u' ], [ 'l', 's', 'v' ], [ 'l', 'q', 'z' ],
    [ 'k', 'y', 'z' ], [ 'r', 's', 'y' ], [ 'n', 'x', 'y' ], [ 'o', 'u', 'x' ],
    [ 'n', 'q', 't' ], [ 'c', 'f', 'h' ], [ 'q', 's', 'x' ], [ 'a', 'l', 'p' ],
    [ 'l', 's', 'u' ], [ 'e', 'r', 'y' ], [ 'k', 'v', 'x' ], [ 'j', 'o', 's' ],
    [ 'o', 'p', 'q' ], [ 'm', 'v', 'w' ], [ 'o', 'q', 'v' ], [ 'a', 'w', 'z' ],
    [ 'l', 'u', 'x' ], [ 'g', 's', 'v' ], [ 'p', 'q', 'v' ], [ 'b', 'o', 's' ],
    [ 'o', 's', 'v' ], [ 'f', 'h', 'y' ], [ 'k', 's', 'w' ], [ 'h', 't', 'u' ],
    [ 't', 'v', 'x' ], [ 'q', 'v', 'w' ], [ 'j', 'p', 'v' ], [ 'c', 'l', 'u' ],
    [ 'm', 's', 'w' ], [ 'e', 'j', 'p' ], [ 'e', 'f', 'h' ], [ 'a', 's', 't' ],
    [ 'i', 'k', 't' ], [ 'j', 'l', 'm' ], [ 'd', 'e', 'x' ], [ 'j', 'x', 'y' ],
    [ 'a', 'k', 'v' ], [ 'j', 'q', 'v' ], [ 's', 'v', 'y' ], [ 'd', 'k', 'q' ],
    [ 'g', 'o', 's' ], [ 'a', 'u', 'y' ], [ 'h', 'u', 'x' ], [ 'e', 'q', 's' ],
    [ 'a', 'f', 'v' ], [ 'i', 'r', 'x' ], [ 'o', 'y', 'z' ], [ 'h', 'v', 'z' ],
    [ 'i', 'u', 'v' ], [ 'h', 'p', 'x' ], [ 'i', 't', 'z' ], [ 'f', 'o', 'q' ],
    [ 'a', 'x', 'y' ], [ 't', 'w', 'x' ], [ 'c', 'u', 'w' ], [ 'b', 'g', 'u' ],
    [ 'q', 'v', 'y' ], [ 'r', 'x', 'z' ], [ 's', 'u', 'x' ], [ 's', 'v', 'z' ],
    [ 'e', 'h', 'l' ], [ 'e', 'w', 'y' ], [ 'j', 's', 'x' ], [ 'q', 'w', 'x' ],
    [ 'q', 'x', 'z' ], [ 'f', 'l', 'n' ], [ 'd', 'n', 'y' ], [ 'j', 'r', 'u' ],
    [ 'u', 'v', 'w' ], [ 't', 'x', 'z' ], [ 'm', 'o', 'z' ], [ 'f', 'm', 'q' ],
    [ 'k', 'l', 'y' ], [ 'f', 's', 'x' ], [ 'm', 'w', 'z' ], [ 'g', 'w', 'x' ],
    [ 'm', 'u', 'y' ], [ 'n', 'q', 'u' ], [ 'l', 't', 'w' ], [ 'r', 'u', 'z' ],
    [ 'o', 's', 'w' ], [ 'd', 's', 'y' ], [ 'u', 'v', 'x' ], [ 'h', 'y', 'z' ],
    [ 'g', 'm', 'u' ], [ 'a', 'c', 'l' ], [ 'd', 'e', 'k' ], [ 'p', 'q', 's' ],
    [ 'g', 'j', 'l' ], [ 'c', 'e', 'g' ], [ 'b', 'l', 'v' ], [ 'o', 'q', 'z' ],
    [ 'p', 'q', 'u' ], [ 'm', 'u', 'w' ], [ 'j', 'n', 'y' ], [ 'c', 'q', 'v' ],
    [ 'p', 'u', 'w' ], [ 'i', 'o', 'y' ], [ 'f', 'm', 'x' ], [ 'j', 't', 'x' ],
    [ 'h', 'm', 'x' ], [ 'c', 's', 'x' ], [ 'i', 'q', 'v' ], [ 's', 'v', 'w' ],
    [ 'i', 'w', 'x' ], [ 'm', 'p', 't' ], [ 'o', 'v', 'y' ], [ 'p', 't', 'u' ],
    [ 'e', 'w', 'x' ], [ 'n', 'r', 's' ], [ 'e', 'l', 'z' ], [ 's', 'u', 'z' ],
    [ 'g', 'm', 't' ], [ 'h', 'u', 'v' ], [ 'r', 't', 'x' ], [ 'l', 's', 'x' ],
    [ 'o', 'p', 'v' ], [ 'n', 'v', 'w' ], [ 'p', 's', 'u' ], [ 'e', 's', 'u' ],
    [ 'j', 'y', 'z' ], [ 'f', 'n', 'u' ], [ 'h', 's', 'v' ], [ 'f', 'm', 'n' ],
    [ 'i', 'q', 'x' ], [ 'd', 'j', 'l' ], [ 'k', 't', 'v' ], [ 'o', 'p', 'w' ],
    [ 'e', 'k', 'm' ], [ 'j', 'n', 'v' ], [ 'h', 'j', 'p' ], [ 'p', 'x', 'z' ],
    [ 'c', 'g', 't' ], [ 'i', 'n', 'r' ], [ 'h', 'o', 'p' ], [ 'c', 'h', 'v' ],
    [ 'l', 'p', 'z' ], [ 'q', 'v', 'z' ], [ 'e', 't', 'w' ], [ 'b', 't', 'x' ],
    [ 'd', 'v', 'x' ], [ 'l', 'r', 'u' ], [ 'f', 'k', 'y' ], [ 'f', 'x', 'y' ],
    [ 'h', 'm', 'n' ], [ 's', 'v', 'x' ]
  ]));
if (true) console.log(recoverSecret([
    [ 'g', 'a', 's' ],
    [ 'o', 'g', 's' ],
    [ 'c', 'n', 't' ],
    [ 'c', 'o', 'n' ],
    [ 'a', 't', 's' ],
    [ 'g', 'r', 't' ],
    [ 'r', 't', 's' ],
    [ 'c', 'r', 'a' ],
    [ 'g', 'a', 't' ],
    [ 'n', 'g', 's' ],
    [ 'o', 'a', 's' ]
  ]));
console.log(recoverSecret([
    [ 't', 's', 'f' ], [ 'a', 's', 'u' ],
    [ 'm', 'a', 'f' ], [ 'a', 'i', 'n' ],
    [ 's', 'u', 'n' ], [ 'm', 'f', 'u' ],
    [ 'a', 't', 'h' ], [ 't', 'h', 'i' ],
    [ 'h', 'i', 'f' ], [ 'm', 'h', 'f' ],
    [ 'a', 'u', 'n' ], [ 'm', 'a', 't' ],
    [ 'f', 'u', 'n' ], [ 'h', 's', 'n' ],
    [ 'a', 'i', 's' ], [ 'm', 's', 'n' ],
    [ 'm', 's', 'u' ]
  ]));
if (true) console.log(recoverSecret([
    ['t','u','p'],
    ['w','h','i'],
    ['t','s','u'],
    ['a','t','s'],
    ['h','a','p'],
    ['t','i','s'],
    ['w','h','s']
  ]));