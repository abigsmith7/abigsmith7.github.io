// Script.js
const numRows = 8;
const numCols = 8;
const numMines = 10;
let gameOver; 
let flagMode;
let minesRemaining;
let cellsRemaining;
let youWin;

const gameBoard = document.getElementById("gameBoard");
let board = [];
 
function initializeBoard() {
    gameOver = false;
    flagMode = false;
    minesRemaining = 10;
    cellsRemaining = 54;
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for ( let j = 0; j < numCols; j++ ) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                marked: false,
                count: 0,
            };
        }
    }
 
    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(
            Math.random() * numRows
        );
        const col = Math.floor(
            Math.random() * numCols
        );
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }
 
    // Calculate counts
    for (let i = 0; i < numRows; i++) {
        for ( let j = 0; j < numCols; j++ ) {
            if (!board[i][j].isMine) {
                let count = 0;
                for ( let dx = -1; dx <= 1; dx++ ) {
                    for ( let dy = -1; dy <= 1; dy++ ) {
                        const ni = i + dx;
                        const nj = j + dy;
                        if ( ni >= 0 && ni < numRows && nj >= 0 && nj < numCols && board[ni][nj].isMine ) {
                            count++;
                        }
                    }
                }
                board[i][j].count = count;
            }
        }
    }
}
 
function revealCell(row, col) {
    if (!gameOver) {
        if ( row < 0 || row >= numRows || col < 0 || col >= numCols || board[row][col].revealed ) {
            return;
        }
            if (board[row][col].marked == false && !flagMode && board[row][col].revealed == false){
                board[row][col].revealed = true;
                cellsRemaining--;

                if (board[row][col].isMine) {
                    gameOver = true;
                    youWin = false;
                } else if ( board[row][col].count == 0 ) {
                // If cell has no mines nearby,
                // Reveal adjacent cells
                    for ( let dx = -1; dx <= 1; dx++ ) {
                        for ( let dy = -1; dy <= 1; dy++ ) {
                            revealCell( row + dx, col + dy );
                        }
                    }
                }
            } else if (board[row][col].revealed == false && flagMode){
                if (board[row][col].marked == true){
                    board[row][col].marked = false;
                } else {
                    board[row][col].marked = true;
                }
            }
 
        renderBoard();
    }
}
 
function renderBoard() {
    gameBoard.innerHTML = "";
 
    for (let i = 0; i < numRows; i++) {
        for ( let j = 0; j < numCols; j++ ) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (board[i][j].revealed) {
                cell.classList.add( "revealed" );
                if ( board[i][j].isMine ) {
                    cell.classList.add( "mine" );
                    cell.textContent = "X";
                } else if ( board[i][j].count > 0 ) {
                    cell.textContent = board[i][j].count;
                    cell.classList.add( "revealed"+ board[i][j].count);
                }
            }
            if (board[i][j].marked){
                cell.classList.add("marked");
                cell.textContent = "FL";
            }
            cell.addEventListener("click",() => revealCell(i, j));
            gameBoard.appendChild(cell);
        }
        checkForWin();
        gameBoard.appendChild(document.createElement("br"));
    }
}

function checkForWin(){
    if (cellsRemaining == 0){
        gameOver = true;
        youWin = true;
        console.log("you win");
    }
    if (gameOver && !youWin){
        console.log("you lose");
    }
}

//initializeBoard();
//renderBoard();