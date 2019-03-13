var pTurn = 0;
$('#playerTurn').css("color", createdPlayers[0].players.color);

colision = false;
//Ajout d'évenement sur les bouton de déplacement
$("#Haut").click(function () {
    changingAxe("-", "y", pTurn);
    moove();
});
$("#Bas").click(function () {
    changingAxe("+", "y", pTurn);
    moove();
});
$("#Gauche").click(function () {
    changingAxe("-", "x", pTurn);
    moove();
});
$("#Droite").click(function () {
    changingAxe("+", "x", pTurn);
    moove();
});

function moove() {
    colision = colisionCheck();
    if (colision === false) {
        pTurn = playerTurnChange(pTurn)
    }

    //Si les joueurs rentre en colision passage en mode combat 
    if (colision === true) {
        $('section.game').toggleClass('hidden');
        display(pTurn);
    }
};
//Défini le tour du joueur
function playerTurnChange(activP) {
    if (activP < (createdPlayers.length - 1)) {
        activP++
    }
    else {
        activP--
    }
    //Mise à jour du tour du joueur
    $('#playerTurn').css("color", createdPlayers[activP].players.color);
    $('#playerTurn').html("C'est le tour du joueur " + (activP + 1));
    $('#numberOfmoove').val(1);
    return activP;
}
//Change l'aye x ou y du joueur afin de le déplacer sur la grille
function changingAxe(operator, axe, activP) {
    var activePlayer = createdPlayers[activP].players;
    var numberOfmoove = $('#numberOfmoove').val();
    //Copie de la position actuel du joueur
    for (var i = 0; i < numberOfmoove; i++) {
        var futurePosition = {
            x: activePlayer.x,
            y: activePlayer.y
        };
        //Incrémentation ou décrémentation de l'axe 
        switch (operator) {
            case "+":
                futurePosition[axe]++
                break;
            case "-":
                futurePosition[axe]--
                break;
        }
        //Paramétrage de la cellule où se rend le joueur
        var cellCheck = (grid[futurePosition.y] &&
            grid[futurePosition.y][futurePosition.x]&&
            grid[futurePosition.y][futurePosition.x].id) ?
            grid[futurePosition.y][futurePosition.x].id : null;

        //Vérification que la destination n'est nis un mur ni en dehors du tableau
        if (cellCheck != "wall" && cellCheck != null) {
            //Déposage de l'ancienne arme sur l'ancienne position du joueur si besoin
            if (activePlayer.oldweapon != null) {
                grid[activePlayer.y][activePlayer.x] = weaponTable[activePlayer.oldweapon];
                activePlayer.oldweapon = null;
            }
            //Sinon remplissage de la case par un objet "blanc"
            else {
                grid[activePlayer.y][activePlayer.x] = fillCell[0];
            }

            //Mise à jour de l'axe changer du joueur dans son objet
            activePlayer[axe] = futurePosition[axe];

            //Changement de l'arme du joueur
            colision = colisionCheck();
            if (colision === true) {
                if (grid[activePlayer.y][activePlayer.x].strength) {
                    weaponChange(activePlayer);
                    colision === false;
                }
                else {
                    break;
                }
            }
            else {
                weaponChange(activePlayer);
            }

            //Placement du joueur dans la grille
            grid[activePlayer.y][activePlayer.x] = activePlayer;

            //Rafraichissement de l'affichage
            tableRefresher();
        }
        //Si la destination est un mur ou en dehors du tableau cela met fin au tour du joueur 
        else {
            alert("C'est un mur cela met fin a ton tour")
            break;

        }
    }

}
//Change l'arme du joueur 
function weaponChange(activePlayer) {
    if (grid[activePlayer.y][activePlayer.x].strength) {
        activePlayer.oldweapon = activePlayer.weapon.id;
        activePlayer.weapon = grid[activePlayer.y][activePlayer.x];
    }
}

//Rafraichi l'affichage du tableau HTML
function tableRefresher() {
    for (var i = 0; i < grid.length; i++) {
        for (var a = 0; a < grid[i].length; a++) {
            var row = i + 1;
            var cell = $("#board").get(0).childNodes[row].childNodes[a];

            while (cell.hasChildNodes()) {
                cell.removeChild(cell.firstChild);
                
            }
            if (grid[i][a].img) {
                $("<img>").prependTo(cell).attr("src", grid[i][a].img);
            }
            if (grid[i][a].color) {
                $(cell).css("background-color", grid[i][a].color)
            }

        }

    }
}
//Check les colisions entre joueur
function colisionCheck() {
    var x1 = createdPlayers[0].players.x;
    var x2 = createdPlayers[1].players.x;
    var y1 = createdPlayers[0].players.y;
    var y2 = createdPlayers[1].players.y;
    if ((x1 == x2 && Math.abs(y1 - y2) <= 1) ||
        (y1 == y2 && Math.abs(x1 - x2) <= 1)) {
        return true;
    }
    return false;
}



