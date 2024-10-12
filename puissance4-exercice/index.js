function displayController(board) {
  const boardGrid = document.getElementById("board-grid");
  const resetbutton = document.createElement("button");
  resetbutton.textContent = "reset";
  boardGrid.append(resetbutton);
  resetbutton.addEventListener("click", () => {
    game.newGame();
  });

  for (let i = 0; i < board.getBoardArray()[0].length; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      game.takeTurn(i);
    });
    boardGrid.append(button);
  }

  const refresh = (currentPlayer) => {
    //console.clear();
    console.log(currentPlayer);
    board.getBoardArray().map((row) => console.log(row));
  };

  const endGameScreen = (winner) => {
    console.log(winner + " Win !");
  };
  return { refresh, endGameScreen };
}

function boardController() {
  let numberOfRow = 6;
  let numberOfCol = 7;
  let _boardArray = [];
  let isWon = false;

  const initBoard = () => {
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
  const checkdiagonal = () => {
    return false;
  };

  const checkWinningMove = (row, col, marker) => {
    if (
      checkHorizontal(row, marker) ||
      checkVertical(col, marker) ||
      checkdiagonal()
    ) {
      isWon = true;
    }
  };

  const playMove = (col, marker) => {
    for (let i = numberOfRow - 1; i >= 0; i--) {
      if (_boardArray[i][col] === 0) {
        _boardArray[i][col] = marker;
        checkWinningMove(i, col, marker);
        console.log(isWon);
        break;
      }
    }
  };

  return { getBoardArray, playMove, initBoard, isWon };
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
    console.log(board.isWon);
    if (board.isWon) {
      handleEndGame();
      console.log("alo");
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      display.refresh(currentPlayer.name);
    }
  };

  const handleEndGame = () => {
    display.endGameScreen(currentPlayer.name);
  };

  const newGame = () => {
    board.initBoard();
    currentPlayer = player1;
    display.refresh(currentPlayer.name);
  };

  return { takeTurn, handleEndGame, newGame };
}

const game = gameController();
game.newGame();
