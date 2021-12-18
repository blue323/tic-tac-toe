let board = document.querySelector(".board")

function createSquares() {
    for(let i=0; i<9; i++){
        let square = document.createElement("div")
        square.classList.add("square")
        square.id = `square-${i}`
        board.appendChild(square)
    }
}

createSquares()

const winnerArrOptions = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"]
]

const Player = (name, mark) => {
    let boardClicks = []
    return {name, mark, boardClicks}
}

let player1 = Player("player 1", "x")
let player2 = Player("player 2", "o")
let isPlayer1Turn = true
let isBotOn = false

let winnerText = document.querySelector("p")
let squares = document.querySelectorAll(".square")
let arraySquares = [...squares]

squares.forEach(square => {
    square.addEventListener("click", () => {
        if(!isBotOn) {
             //console.log(square.id.charAt(square.id.length-1))
            if(isPlayer1Turn && square.textContent === "") {
                square.textContent = player1.mark
                player1.boardClicks.push((square.id.charAt(square.id.length-1)))
            } else if(!isPlayer1Turn && square.textContent === "") {
                square.textContent = player2.mark
                player2.boardClicks.push((square.id.charAt(square.id.length-1)))
            }

            isPlayer1Turn = !isPlayer1Turn
        } else if(isBotOn && square.textContent === "") {
            square.textContent = player1.mark
            player1.boardClicks.push((square.id.charAt(square.id.length-1)))
            let emptySquares = arraySquares.filter(square => square.textContent === "")
            let randomEmptySquare =  emptySquares[Math.floor(Math.random() * emptySquares.length)]
            if(randomEmptySquare) {
                randomEmptySquare.textContent = player2.mark
                player2.boardClicks.push((randomEmptySquare.id.charAt(randomEmptySquare.id.length-1)))
            }

        }
        findTheWinner()
    })
})



function findTheWinner() {
    for(let i=0; i<winnerArrOptions.length; i++) {
        if(winnerArrOptions[i].every(number => player1.boardClicks.includes(number))) {  //1 logic from stack overflow
            winnerText.textContent = "Player 1 wins!"
        } else if (winnerArrOptions[i].every(element => player2.boardClicks.includes(element))){
            winnerText.textContent = "Player 2 wins!"
        } 
    }

    if(winnerText.textContent.includes("Player")){
        squares.forEach(square => {
            if(square.textContent === "") {
                square.textContent = " "
            }
        })
    }    

    if(arraySquares.every(square => square.textContent.length > 0) && 
        !winnerText.textContent.includes("Player")) {
        winnerText.textContent = "It's a draw!"
    }
}

/* 1 how to check if an array contains all the values of another array

The every() method tests whether all elements in the array pass the test 
implemented by the provided function.

The includes() method determines whether an array includes a certain 
element, returning true or false as appropriate.

let mainArr = [1,2,3];
function isTrue(arr, arr2){
  return arr.every(i => arr2.includes(i));
}
console.log(isTrue(mainArr, [1,2,3]));      true
console.log(isTrue(mainArr, [1,2,3,4]));    true
console.log(isTrue(mainArr, [1,2]));        false

*/

const btnNewGame = document.getElementById("newGame")

btnNewGame.addEventListener("click", newGame)

function newGame() {
    squares.forEach(square => square.textContent = "")
    isPlayer1Turn = true
    player1.boardClicks = []
    player2.boardClicks = []
    winnerText.textContent = "Who will be the winner?"
}

let btnTurnOnBot = document.getElementById("bot")

btnTurnOnBot.addEventListener("click", () => {
    newGame()
    isBotOn = !isBotOn
    btnTurnOnBot.textContent = `${isBotOn ? "Turn off Bot" : "Turn on Bot"}`
})