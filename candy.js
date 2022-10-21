const boardDisplay = document.getElementById("gameBoard");
const playerButtons = document.getElementById("playerButtons");
const generatedBoard = document.getElementById("board");
const infoText = document.getElementById("infoText");

//Determines the colors of the player pawns.
const playerColors = [
    "#FF290B",
    "#3686CA",
    "#51AC20",
    "#FFCC1C"
]

//Determine what colors the spaces will have.
const spaceColors = [
    "#FAB5D1",
    "#FF290B",
    "#3686CA",
    "#51AC20",
    "#FFCC1C",
    "#97236A"
]

//Don't ask.
const colorList = [1, 2, 3, 4, 5, 0];

//Defines where the pawns should be places relative to the space they're on; this is to prevent overlapping
const playerOffsets = [
    [-10, -10],
    [10, -10],
    [-10, 10],
    [10, 10]
]

//Set names for the four pawns, for selection purposes.
const pawnNames = [
    "pawnA",
    "pawnB",
    "pawnC",
    "pawnD"
]


// Identify the color display on the card.
const colorDisplayA = document.getElementById("colorA");
const colorDisplayB = document.getElementById("colorB");


//Defining the locations and colors of the game board spaces
class space {
    constructor(color, data, x, y) {
        this.color = color;
        this.data = data;
        this.position = [x, y]
    }
}
const spaces = [
    new space(1, 1, 25, 475),
    new space(5, 1, 70, 475),
    new space(4, 1, 115, 475),
    new space(2, 1, 160, 475),
    new space(1, 1, 205, 475),
    new space(3, 1, 250, 475),
    new space(1, 1, 295, 475),
    new space(5, 1, 340, 475),
    new space(0, 1, 385, 475),
    new space(4, 1, 430, 475),
    new space(2, 1, 475, 475),
    new space(1, 1, 475, 430),
    new space(3, 1, 475, 385),
    new space(1, 1, 430, 385),
    new space(5, 1, 385, 385),
    new space(4, 1, 340, 385),
    new space(2, 1, 295, 385),
    new space(1, 1, 250, 385),
    new space(3, 1, 205, 385),
    new space(0, 1, 160, 385),
    new space(1, 1, 115, 385),
    new space(5, 1, 70, 385),
    new space(4, 1, 25, 385),
    new space(2, 1, 25, 340),
    new space(1, 1, 25, 295),
    new space(3, 1, 70, 295),
    new space(1, 1, 115, 295),
    new space(5, 1, 160, 295),
    new space(4, 1, 205, 295),
    new space(2, 1, 250, 295),
    new space(1, 1, 295, 295),
    new space(3, 1, 340, 295),
    new space(1, 1, 385, 295),
    new space(5, 1, 430, 295),
    new space(4, 1, 475, 295),
    new space(2, 1, 475, 250),
    new space(1, 1, 475, 205),
    new space(3, 1, 430, 205),
    new space(1, 1, 385, 205),
    new space(5, 1, 340, 205),
    new space(4, 1, 295, 205),
    new space(2, 1, 250, 205),
    new space(1, 1, 205, 205),
    new space(3, 1, 160, 205),
    new space(1, 1, 115, 205),
    new space(5, 1, 70, 205),
    new space(4, 1, 25, 205),
    new space(0, 1, 25, 160),
    new space(2, 1, 25, 115),
    new space(1, 1, 70, 115),
    new space(3, 1, 115, 115),
    new space(1, 1, 160, 115), //licorice space
    new space(5, 1, 205, 115),
    new space(4, 1, 250, 115),
    new space(2, 1, 295, 115),
    new space(1, 1, 340, 115),
    new space(3, 1, 385, 115),
    new space(1, 1, 430, 115),
    new space(5, 1, 475, 115),
    new space(4, 1, 475, 70),
    new space(2, 1, 475, 25),
    new space(1, 1, 430, 25),
    new space(3, 1, 385, 25),
    new space(1, 1, 340, 25),
    new space(5, 1, 295, 25),
    new space(4, 1, 250, 25),
    new space(2, 1, 205, 25),
    new space(1, 1, 160, 25),
    new space(3, 1, 115, 25),
    new space(1, 1, 70, 25),
    new space(5, 1, 25, 25),
]

//Defining the player objects
class player {
    constructor(pnum) {
        this.playerId = pnum; //Used for creating and updating the pawns
        this.position = -1;
        this.stuck = false;
        this.pawn = null;
    }
    move(pos){
        this.position = pos;
        if (this.pawn == null) { //Create a new pawn if one doesn't exist, should only happen on the first turn
            const pawnHtml = "<circle cx='0' cy='0' r='10' fill='" + playerColors[this.playerId] + "' id='" + pawnNames[this.playerId] + "' stroke='white' stroke-width='3'></circle>"
            generatedBoard.innerHTML += pawnHtml;
        }
        this.pawn = document.getElementById(pawnNames[this.playerId]); //Reassigns the pawn value; for some reason not doing this every turn breaks the pawns.

        //Move the pawn to its new position on the board.
        this.pawn.setAttribute("cx", spaces[pos].position[0] + playerOffsets[this.playerId][0])
        this.pawn.setAttribute("cy", spaces[pos].position[1] + playerOffsets[this.playerId][1])
    }
}

class board {
    constructor(playerCount) {
        let count = playerCount;
        if (count > 4) {
            count = 4
            console.log("Player count can't be higher than 4, lowering...")
        } else if (count < 2) {
            console.log("Player count can't be lower than 2, increasing...")
        }
        this.ended = false;
        this.players = []
        for (let i = 0; i < count; i++) {
            this.players[i] = new player(i);
        }
        this.currentPlayer = 0;
        this.spaceColors = [
            "#FAB5D1",
            "#FF290B",
            "#3686CA",
            "#51AC20",
            "#FFCC1C",
            "#97236A"
        ] //The sixth color cannot be drawn
    }
    colorRoll(max){
        return Math.floor(Math.random() * max);
    }

    drawCard(){
        if (this.ended == false) {

            //Randomly generate the next color, and show it on the card.
            const colorA = colorList[this.colorRoll(5)];
            colorDisplayA.setAttribute("fill", spaceColors[colorA]);
            colorDisplayB.setAttribute("fill", spaceColors[colorA]);

            //I didn't know if JS had a return statement, so this was my substitute.
            let spaceFound = false;

            //Search through every space ahead of the player to look for a space matching the card's color.
            for (let i = this.players[this.currentPlayer].position + 1; i < spaces.length; i++) {

                //If a valid space has not already been found and moved to, look in the next space.
                if (spaceFound == false) {
                    //If the space matches, move to it.
                    if (spaces[i].color == colorA) {
                        spaceFound = true;
                        if (i >= (spaces.length - 1)) {
                            this.ended = true;
                        }
                        this.players[this.currentPlayer].move(i);
                    }
                }
            }

            //If the game didn't end on this turn, go to the next player.
            if (this.ended == false) {
                this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
                infoText.innerHTML = "Player " + (this.currentPlayer + 1) + ", it's your turn!";
            } else {
                infoText.innerHTML = "Player " + (this.currentPlayer + 1) + " wins! Refresh to play again."
            }
        }
    }
}

var gameBoard;

//Start a new game with a number of players defined by the "players" input.
function startGame(players) {
    gameBoard = new board(players);

    //Place all the spaces on the board
    spaces.forEach((space) => {
        const spaceHtml = "<circle cx='" + space.position[0] + "' cy='" + space.position[1] + "' r='20' fill='" + spaceColors[space.color] + "' stroke='white' stroke-width='5'></circle>"
        generatedBoard.innerHTML += spaceHtml;
    })

    //Unhides the board, and hides the player selection buttons.
    boardDisplay.style.display = "block";
    playerButtons.style.display = "none";
    infoText.innerHTML = "Player 1, it's your turn!"
}

//Hides the board until after the game starts
boardDisplay.style.display = "none";