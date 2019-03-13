var targetHP = 100;

//Ajout d'évenement sur les bouton d'attaque et de défense
$("#attaquer").click(function () {
    var targetHP = attack(pTurn);
    fight(targetHP);
});
$("#defendre").click(function () {
    createdPlayers[pTurn].players.shield = defend(pTurn);
    fight(targetHP);
});
function fight(targetHP) {
    if (targetHP > 0) {
        //Changement du tour du joueur est rafraichissement des informations joueurs
        pTurn = playerTurnChange(pTurn)
        displayRefresher(pTurn, targetHP);
    }
    else {
        //Changement relatif a la fin de partie
        $('#fight').toggleClass('hidden');
        $('#endScreen').toggleClass('hidden');
        $("#reload").click(function () {
            location.reload()
        });
        displayRefresher(pTurn, targetHP);
    }
};
//Définition de l'attaquant et de la cible
function attack(activP) {
    switch (activP) {
        case 0:
            targetHP = fightAction("1", activP);
            break;

        case 1:
            targetHP = fightAction("0", activP);
            break;
    }

    return targetHP;

};

//Passage du joueur actif en mode défense
function defend(activP) {

    if (createdPlayers[activP].players.shield === 0.5) {
        $('#combatLog').html(combatLog("already", activP));
    }
    else {
        shield = 0.5;
        $('#combatLog').html(combatLog("defend", activP));
    }

    return shield;
};

//Résolution des dommages infligé
function fightAction(targetedP, activP) {
    var target = createdPlayers[targetedP].players;
    var assailantStrength = createdPlayers[activP].players.weapon.strength;
    if (target.shield === 0.5) {
        var targetHP = target.hp - (assailantStrength * target.shield)
        target.hp = targetHP;
        target.shield = 1;
        $('#combatLog').html(combatLog("attack/2", activP, assailantStrength));
    }

    else {
        var targetHP = target.hp - assailantStrength
        target.hp = targetHP;
        $('#combatLog').html(combatLog("attack", activP, assailantStrength));
    }

    return targetHP;
};
//Affichage des informations relative a chaque joueur
function display(activP) {
    $('#activTurn').css("color", createdPlayers[activP].players.color);
    $('#activTurn').html("C'est le tour du joueur " + (activP + 1) + ".");
    $('#p1H').html("Le joueur 1 a " + createdPlayers[0].players.hp + " point de vie.");
    $('#p2H').html("Le joueur 2 a " + createdPlayers[1].players.hp + " point de vie.");
    $('#p1W').html("Il possède un " + createdPlayers[0].players.weapon.name + " qui fait " + createdPlayers[0].players.weapon.strength + " de dommage.");
    $('#p2W').html("Il possède un " + createdPlayers[1].players.weapon.name + " qui fait " + createdPlayers[1].players.weapon.strength + " de dommage.");
};

//Rafraichissement des informations relative au joueur
function displayRefresher(activP, targetHP) {
    $('#activTurn').css("color", createdPlayers[activP].players.color);
    activP ++
    $('#activTurn').html("C'est le tour du joueur " + activP + ".");
    $('#p1H').html("Le joueur 1 a " + createdPlayers[0].players.hp + " point de vie.");
    $('#p2H').html("Le joueur 2 a " + createdPlayers[1].players.hp + " point de vie.");
    if (targetHP <= 0) {
        $('#endTitle').html("C'est le joueur " + activP + " qui remporte la victoire.");
    }

};

//Affichage des informations de combat
function combatLog(action, activP, strength) {
    activP ++
    var combatLog = "";
    switch (action) {
        case "attack":
            combatLog = "Le joueur " + activP + " a infliger " + strength + " dégâts.";
            break;
        case "attack/2":
            combatLog = "Le joueur " + activP + " a infliger " + (strength / 2) + " dégâts.";
            break;
        case "defend":
            combatLog = "Le joueur " + activP + " se met à couvert.";
            break;
        case "already":
            combatLog = "Le joueur " + activP + " était déjà à couvert il perd sont tour";
            break;
    }
    return combatLog;
};

