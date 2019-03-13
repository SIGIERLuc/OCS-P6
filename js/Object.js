function playerSchema(infoPerso) {
    this.players = Object.assign({
        hp: 100,
        shield: 1,
        oldweapon: null,
        weapon: new weaponSchema(0, 10, "couteaux", "../img/knife.jpg", "white")
    }, infoPerso)
}

function weaponSchema(id, strength, name, img, color) {
        this.id = id,
        this.strength = strength,
        this.name = name
        this.img = img;
        this.color = color;
};

function defaultCell(data) {
    for (let key of Object.keys(data)) {
        this[key] = data[key]
    }
};

var fillCell = [

];
var createdPlayers = [

];

var weaponTable = [

];

var grid = [

];
