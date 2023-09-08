
const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const strike = document.getElementById("strike");


let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

const winningCombinations = [
    //rows
    { combo: [1, 2, 3], strikeClass: "strike-row-1" },
    { combo: [4, 5, 6], strikeClass: "strike-row-2" },
    { combo: [7, 8, 9], strikeClass: "strike-row-3" },
    //columns
    { combo: [1, 4, 7], strikeClass: "strike-column-1" },
    { combo: [2, 5, 8], strikeClass: "strike-column-2" },
    { combo: [3, 6, 9], strikeClass: "strike-column-3" },
    //diagonals
    { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
    { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
  ];

function handleResultValidation() {
    let roundWon = false;
        for (const winningCombination of winningCombinations) {
            //const winCondition = winningCombinations[i];
            //const a = board[winCondition[0]];
            //const b = board[winCondition[1]];
            //const c = board[winCondition[2]];
            const { combo, strikeClass } = winningCombination;
            const a = board[combo[0]-1];
            const b = board[combo[1]-1];
            const c = board[combo[2]-1];
       
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                strike.classList.add(strikeClass);
                break;
            }
        }
 

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            
         
            return;
        }

    if (!board.includes(''))
        announce(TIE);
}



function announce(type){
    setTimeout(function () {
     switch(type){
        case PLAYERO_WON:
            alert('O is the winner')
            
            break;
        case PLAYERX_WON:
            alert('X is the winner')

            break;
        case TIE:
            alert('The match is draw')
        }
    }, 200); 
};


const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }

     return true;
};

const updateBoard =  (index) => {
    board[index] = currentPlayer;
    
    }

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
        }
    }
    
const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    strike.className = "strike";

    if (currentPlayer === 'O') {
        changePlayer();
        }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
        });
    }

tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});

resetButton.addEventListener('click', resetBoard);
