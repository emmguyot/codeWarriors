function findMissingLetter(array)
{
    codeLetter = null;
    for (l of array) {
        if ((codeLetter != null) && (l.codePointAt(0) != (codeLetter + 1))) return String.fromCodePoint(codeLetter+1);
        codeLetter = l.codePointAt(0);
    }
}