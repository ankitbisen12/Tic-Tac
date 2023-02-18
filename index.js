"use strict";

//*****************selecting elements*******************\\
const cell = Array.from(document.querySelectorAll(".cell"));
const resetBtn = document.querySelector("#reset");
const result = document.querySelector(".result");
const btnCloseModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");


//****************variables declaration****************\\
let ticTacboard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const p1_Won = "P1WON";
const p2_Won = "P2WON";
const tie = "TIE";

//wiining combination array
const winningMatrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


//************************Function part***************\\
//logic for opening modal window 
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

//logic for closing modal widow
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

//logic for resetting the tic tac grid.
const resetTicTacGrid = () => {
    ticTacboard = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    result.classList.add("hidden");
    result.innerText = '';

    if (currentPlayer === "0") switchPlayer();

    cell.forEach((celll) => {
        celll.innerText = "";
    });

    openModal();
};

//initialize the tic tac grid.
const init = () => {
    resetTicTacGrid();
}
init();

//it will simply for outputting result
const gameResult = (type) => {
    switch (type) {
        case p1_Won:
            result.innerHTML = `<span class="p1">Player 1  Won 🔥💥⚡️</span>`;
            break;
        case p2_Won:
            result.innerHTML = `<span class="p1">Player 2 Won 🔥💥⚡️</span>`;
            break;
        case tie:
            result.innerHTML = `<span class="p1">Game Tie</span>😢`;
    }
    result.classList.remove("hidden");
};


//logic for handle result validation.
const resultValidation = ()=> {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningMatrix[i];
        const a = ticTacboard[winCondition[0]];
        const b = ticTacboard[winCondition[1]];
        const c = ticTacboard[winCondition[2]];
        
        if (a === "" || b === "" || c === "") continue;
        
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    
    //if any of the player won the game.
    if (roundWon) {
        gameResult(currentPlayer === "X" ? p1_Won : p2_Won);
        isGameActive = false;
        return;
    }
    
    //if all squares are fille
    if (!ticTacboard.includes("")) {
        gameResult(tie);
    }
}

//logic for switching player or give control to the other player.
const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    // console.log(currentPlayer);
};

//logic for upadting the 
const updateBoard = (index) => {
    ticTacboard[index] = currentPlayer;
};

//logic which checks current square be are clicked is filled or not.
const isValidAction = (celll) => {
    if (celll.innerText === "X" || celll.innerText === "0")  return false;
    
    return true;
};

//main logic which is work for each square.
const userAction = (celll, index) => {
    if (isValidAction(celll) && isGameActive) {
        celll.innerText = currentPlayer;
        updateBoard(index);
        resultValidation();
        switchPlayer();
    }
};

//attaching eventlistener to all grid cell.
cell.forEach((celll, index) => {
    celll.addEventListener("click", () => {
        // console.log("clicked");
        userAction(celll, index)});
});

//***************************EventListener Part********************\\
//higher order functions
btnCloseModal.addEventListener('click',closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden"))  closeModal();
});
  
resetBtn.addEventListener('click', resetTicTacGrid);