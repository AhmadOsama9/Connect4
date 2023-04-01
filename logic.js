var playerRed = "R";
var playerYellow = "Y";
var curPlayer = playerRed;
let restartBtn = document.getElementById("restartBtn");
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');




var gameOver = false;
var board;
var curColumns = [5, 5, 5, 5, 5, 5, 5];

var rows = 6;
var columns = 7;
let winningTiles = [];


window.onload = function(){
    startGame();
}

function startGame(){

    createBoard();
    addEvent();

}



// function restart(){
//     gameOver = false;
//     curPlayer = playerRed;
//     let winner = document.getElementById("winner");
//     winner.innerText = "";
//     curColumns = [5, 5, 5, 5, 5, 5, 5];

//     // Loop through all tiles and remove piece classes
//     for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < columns; c++) {
//             let tile = document.getElementById(r.toString() + "-" + c.toString());
//             tile.classList.remove("red-piece");
//             tile.classList.remove("yellow-piece");
//             tile.classList.remove("winning-tile");      
//         }
//     }

//     startGame();
// }


function createBoard(){
    //so here we create the 42 div boxes
    //we could have done them manually as in x0
    //but they are 42 so there's no way
    board = [];
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
    
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function addEvent(){

    var tiles = document.querySelectorAll(".tile");
    for(var i = 0; i < tiles.length; i++)
        tiles[i].addEventListener('click', tileClicked);
}

function tileClicked()
{
    if(gameOver)
        return;

    
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = curColumns[c];
    if(r < 0)
        return;

    board[r][c] = curPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(curPlayer == playerRed)
        tile.classList.add("red-piece");
    else
        tile.classList.add("yellow-piece");
    
    curPlayer = curPlayer == playerRed ? playerYellow : playerRed;

    curColumns[c]--;

    checkWinner();
}

function checkWinner(){

    for(let r = 0; r < rows; r++)
        for(let c = 0; c < columns - 3; c++)
            if(board[r][c] != ' ')
                if(board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3])
                {
                    for(let i = 0; i < 4; i++)
                        winningTiles.push([r, c + i]);
                        setWinner();
                        addWinningClass(winningTiles);
                        return;
                }

    for(let c = 0; c < columns; c++)
        for(let r = 0; r < rows - 3; r++)
            if(board[r][c] != ' ')
                if(board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c])
                {
                    for(let i = 0; i < 4; i++)
                        winningTiles.push([r + i, c]);
                        setWinner();
                        addWinningClass(winningTiles);
                        return;
                }

    for(let r = 0; r < rows - 3; r++)
        for(let c = 0; c < columns - 3; c++)
            if(board[r][c] != ' ')
                if(board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3])
                {
                    for(let i = 0; i < 4; i++)
                        winningTiles.push([r + i, c + i]);
                        setWinner();
                        addWinningClass(winningTiles);
                        return;
                }

    for(let r = 3; r < rows; r++)
        for(let c = 0; c < columns - 3; c++)
            if(board[r][c] != ' ')
                if(board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3])
                {
                    for(let i = 0; i < 4; i++)
                        winningTiles.push([r - i, c + i]);
                        setWinner();
                        addWinningClass(winningTiles);
                        return;
                } 
}

function setWinner(){
    let winner = document.getElementById("winner");
    if(board[winningTiles[0][0]][winningTiles[0][1]] == playerRed)
        winner.innerText = "Red Wins!";
    else
        winner.innerText = "Yellow Wins!";

    gameOver = true;

}

function addWinningClass(winningTiles){
    for(let i = 0; i < winningTiles.length; i++)
    {
        let [row, col] = winningTiles[i];
        let tile = document.getElementById(row + "-" + col);
        tile.classList.add("winning-tile");
    }
    winningTiles = [];
}

    

