function validateBattlefield(field) {
    let shipsToFind = {
        // Size : number
        '4' : 1,
        '3' : 2,
        '2' : 3,
        '1' : 4
    };
    let surfaceSeen = Array(10).fill().map(()=>Array(10).fill(false));

    let inShip = false;

    for (let y = 0; y < field.length; y++) {
        const ligne = field[y];
        for (let x = 0; x < ligne.length; x++) {
            const element = ligne[x];
            // Check a ship
            if (!surfaceSeen[y][x]) {
                if (element == 1) {
                    let posX = x;
                    let posY = y;
                    let size = 1;
                    while ((posX < 9) && (field[posY][posX] == 1)) 
                    if (field[]) 
                }

            }
            
            // Check around
            if (element == 1) {
                if (!(((x > 0) || field[y][x-1] != 1)
                    && ((x > 0) || (y > 0) || field[y-1][x-1] != 1)
                    && ((x > 0) || (y < 9) || field[y+1][x-1] != 1)
                    && ((y > 0) || field[y-1][x] != 1)
                    && ((y < 9) || field[y+1][x] != 1)
                    && ((x < 9) || field[y][x+1] != 1)
                    && ((x < 9) || (y > 0) || field[y-1][x+1] != 1)
                    && ((x < 9) || (y < 9) || field[y+1][x+1] != 1))) {

                    return false;
                }
            }

        }
    }


}

console.log(validateBattlefield([
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]));