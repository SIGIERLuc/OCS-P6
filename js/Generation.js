grid = gridGenerataion();
grid = wallGeneration(grid);
grid = playerColisionCheck(grid);
weaponGenerate();
grid = weaponPlacement(grid, weaponTable);
tableGeneration();

//Génération de la grille remplie de case libre
function gridGenerataion() {
    var freeCell = new defaultCell({ id: "blanc", color: "white" })
    fillCell.push(freeCell);
    var nrows = 8
    var ncols = 8
    var grid = new Array(nrows).fill().map(function (row) {
        return new Array(ncols).fill(freeCell)
    });
    return grid
}

//Génération et placement des murs sur la grille
function wallGeneration(grid) {
    var i = 0;
    var neededCell = Math.floor(Math.random() * (8) + 1);
    var wall = new defaultCell({ id: "wall", img: "../img/wall.jpg" })
    while (i <= neededCell) {
        var row = Math.floor(Math.random() * grid.length);
        var colunm = Math.floor(Math.random() * grid[row].length);
        if (grid[row][colunm].id === "blanc") {
            grid[row][colunm] = wall;
            i++
        }
    }
    return grid

};
//Génération des armes utilisé dans le jeu
function weaponGenerate() {
    for (var i = 0; i < 5; i++) {
        var weapon = new weaponSchema("" + i, 10 + i * 6, "defaultName", "../img/weapon" + i + ".jpg", "white")
        switch (i) {
            case 0:
                weapon.name = "Couteau"
                break;
            case 1:
                weapon.name = "Glock"
                break;
            case 2:
                weapon.name = "Fusil d'assaut"
                break;
            case 3:
                weapon.name = "Fusil de sniper"
                break;
            case 4:
                weapon.name = "Lance roquette"
                break;
        }
        weaponTable.push(weapon)
    }
}
//Placement des armes généré
function weaponPlacement(grid, weaponTable) {
    var i = 0;
    var neededCell = Math.floor(Math.random() * (4) + 1);
    while (i < neededCell) {
        var weapon = Math.floor(Math.random() * (4) + 1);
        var row = Math.floor(Math.random() * grid.length);
        var colunm = Math.floor(Math.random() * grid[row].length);
        if (grid[row][colunm].id === "blanc") {
            grid[row][colunm] = weaponTable[weapon];
            i++
        }
    }
    return grid
};
//Génération et placement des joueurs sur la grille
function playerColisionCheck(grid) {
    var colunm1 = null;
    var colunm2 = null;
    var i = 1;
    var Player = 2;
    while (i <= Player) {
        var row = Math.floor(Math.random() * grid.length);
        var colunm = Math.floor(Math.random() * grid[row].length);

        colunm1 = (grid[row][colunm + 1]) ? grid[row][colunm + 1] : "";
        colunm2 = (grid[row][colunm - 1]) ? grid[row][colunm - 1] : "";

        if (colunm1.id != "wall" && colunm2.id != "wall") {
            if (grid[row][colunm].id === "blanc") {
                if (i === 2) {
                    var x1 = createdPlayers[0].players.x;
                    var x2 = colunm;
                    var y1 = createdPlayers[0].players.y;
                    var y2 = row;
                    if ((x1 == x2 && Math.abs(y1 - y2) <= 1) ||
                        (y1 == y2 && Math.abs(x1 - x2) <= 1)) {
                    }
                    else {
                        i = playerGeneration(i, row, colunm);
                    }
                }
                else {
                    i = playerGeneration(i, row, colunm);
                }
            }
        }
    }
    return grid;
};
//Génération et placement sur la grille des joueurs
function playerGeneration(playerNumber, row, colunm) {
    var perso = new playerSchema({
        id: "Player" + playerNumber,
        x: colunm,
        y: row,
        img: "../img/p" + playerNumber + ".png",
        color: ""
    })
    if (playerNumber === 1) {
        perso.players.color = "red";
    }
    else {
        perso.players.color = "green";
    }
    createdPlayers.push(perso);
    grid[perso.players.y][perso.players.x] = perso.players;
    playerNumber++
    return playerNumber
}
//Génération du tableau HTML par rapport au tableau JS
function tableGeneration() {
    var numberOfRow = grid.length;
    for (var i = 0; i < numberOfRow; i++) {
        $("<tr></tr>").appendTo("#board").attr("id", "row" + i);
        var numberOfCell = grid[i].length;
        for (var a = 0; a < numberOfCell; a++) {
            cell = $("<td></td>").appendTo("#row" + i);
            if (grid[i][a].img) {
                $("<img>").prependTo(cell).attr("src", grid[i][a].img);
            }
            if (grid[i][a].color) {
                $(cell).css("background-color", grid[i][a].color)
            }

        }
    }
};

