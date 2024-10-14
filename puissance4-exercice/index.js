function displayController(board) {
  const controls = document.querySelector(".controls");
  const boardContainer = document.querySelector(".board");

  const newGamebutton = document.createElement("button");
  newGamebutton.textContent = "NEW GAME";
  controls.append(newGamebutton);

  newGamebutton.addEventListener("click", () => {
    game.newGame();
  });

  const clearDisplay = () => {
    while (boardContainer.firstChild) {
      boardContainer.removeChild(boardContainer.firstChild);
    }
  };

  const renderDisplay = (currentPlayer) => {
    for (let i = 0; i < board.getBoardArray()[0].length; i++) {
      const column = document.createElement("div");
      column.classList.add("column");

      for (let j = 0; j < board.getBoardArray().length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (board.getBoardArray()[j][i] === 1) {
          cell.classList.add("player-1");
        } else if (board.getBoardArray()[j][i] === 2) {
          cell.classList.add("player-2");
        } else {
          cell.classList.add("empty");
        }
        column.append(cell);
      }

      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      indicator.classList.add("cell");
      if (currentPlayer.marker === 1) {
        indicator.classList.add("player-1");
      } else {
        indicator.classList.add("player-2");
      }
      column.append(indicator);

      column.addEventListener("click", () => {
        if (!board.getIsWon()) {
          game.takeTurn(i);
        }
      });

      boardContainer.append(column);
    }
  };

  const refresh = (currentPlayer) => {
    clearDisplay();
    renderDisplay(currentPlayer);
  };

  const showEndGameScreen = (winner) => {
    clearDisplay();
    renderDisplay(winner);
    const message = document.createElement("h2");
    message.classList.add("winner-popup");
    message.textContent = winner.name + " a gagné";
    boardContainer.append(message);
  };
  return { refresh, showEndGameScreen };
}

function boardController() {
  let numberOfRow = 6;
  let numberOfCol = 7;
  let _boardArray = [];
  let isWon = false;

  const getIsWon = () => {
    return isWon;
  };

  const initBoard = () => {
    isWon = false;
    _boardArray = [];
    for (let i = 0; i < numberOfRow; i++) {
      let row = [];
      for (let j = 0; j < numberOfCol; j++) {
        row.push(0);
      }
      _boardArray.push(row);
    }
  };

  const getBoardArray = () => {
    return _boardArray.map((row) => [...row]);
  };

  const checkHorizontal = (row, marker) => {
    let markerCounter = 0;
    for (let i = 0; i < numberOfCol; i++) {
      if (getBoardArray()[row][i] === marker) {
        markerCounter += 1;
      } else {
        markerCounter = 0;
      }
      if (markerCounter >= 4) {
        console.log("win horizontale");
        return true;
      }
    }
  };

  const checkVertical = (col, marker) => {
    let markerCounter = 0;
    for (let i = 0; i < numberOfRow; i++) {
      if (getBoardArray()[i][col] === marker) {
        markerCounter += 1;
      } else {
        markerCounter = 0;
      }
      if (markerCounter >= 4) {
        console.log("win verticale");
        return true;
      }
    }
  };

  const checkdiagonal = (row, col, marker) => {
    let diagSWtoNE = 1;
    let keepSW = true;
    let keepNE = true;

    let diagNWtoSE = 1;
    let keepNW = true;
    let keepSE = true;

    const b = getBoardArray();
    /*       col
      [ [0],[0],[0],[0],[0]    ]
        [0],[NE],[0],[NW],[0]
   row  [0],[0],[CR],[0],[0]
        [0],[SE],[0],[SW],[0]
        [0],[0],[0],[0],[0]
    */

    for (let i = 1; i <= 3; i++) {
      if (!(row + i >= b.length || col + i >= b[0].length) && keepSE) {
        if (b[row + i][col + i] === marker) {
          diagNWtoSE++;
        } else {
          keepSE = false;
        }
      }

      if (!(row - i < 0 || col - i < 0) && keepNW) {
        if (b[row - i][col - i] === marker) {
          diagNWtoSE++;
        } else {
          keepNW = false;
        }
      }

      if (!(row - i < 0 || col + i >= b[0].length) && keepNE) {
        if (b[row - i][col + i] === marker) {
          diagSWtoNE++;
        } else {
          keepNE = false;
        }
      }

      if (!(row + i >= b.length || col - i < 0) && keepSW) {
        if (b[row + i][col - i] === marker) {
          diagSWtoNE++;
        } else {
          keepSW = false;
        }
      }
    }

    return diagSWtoNE >= 4 || diagNWtoSE >= 4;
  };

  const checkWinningMove = (row, col, marker) => {
    if (
      checkHorizontal(row, marker) ||
      checkVertical(col, marker) ||
      checkdiagonal(row, col, marker)
    ) {
      isWon = true;
    }
  };

  const playMove = (col, marker) => {
    for (let i = numberOfRow - 1; i >= 0; i--) {
      if (_boardArray[i][col] === 0) {
        _boardArray[i][col] = marker;
        checkWinningMove(i, col, marker);
        break;
      }
    }
  };

  return { getBoardArray, playMove, initBoard, getIsWon };
}

function gameController() {
  const board = boardController();
  board.initBoard();
  const display = displayController(board);

  const player = (name, marker) => {
    return { name, marker };
  };

  const player1 = player("Player 1", 1);
  const player2 = player("Player 2", 2);

  let currentPlayer;

  const takeTurn = (column) => {
    board.playMove(column, currentPlayer.marker);
    if (board.getIsWon()) {
      handleEndGame();
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      display.refresh(currentPlayer);
    }
  };

  const handleEndGame = () => {
    display.showEndGameScreen(currentPlayer);
  };

  const newGame = () => {
    board.initBoard();
    currentPlayer = player1;
    display.refresh(currentPlayer);
  };

  return { takeTurn, handleEndGame, newGame };
}

const game = gameController();
game.newGame();
