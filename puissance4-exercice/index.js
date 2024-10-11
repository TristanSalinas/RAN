function displayController(gameController, board) {
  const boardGrid = document.getElementById("board-grid");
  const resetbutton = document.createElement("button");
  resetbutton.textContent = "reset";

  for (let i = 0; i < board.getBoardArray()[0].length; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      game.takeTurn(i);
    });
    boardGrid.append(button);
  }

  function refresh() {
    //console.clear();
    board.getBoardArray().map((row) => console.log(row));
  }

  function endGameScreen(winner) {
    console.log(winner + " Win !");
  }
  return { refresh, endGameScreen };
}

function boardController(gameController) {
  let numberOfRow = 6;
  let numberOfCol = 7;
  let _boardArray = [];

  function getBoardArray() {
    return _boardArray.map((row) => [...row]); //Pourquoi je doit faire une copie ???
  }

  function initBoard() {
    _boardArray = [];
    for (let i = 0; i < numberOfRow; i++) {
      let row = [];
      for (let j = 0; j < numberOfCol; j++) {
        row.push(0);
      }
      _boardArray.push(row);
    }
  }

  function checkHorizontal(row, marker) {
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
  }

  function checkVertical(col, marker) {
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
  }
  function checkdiagonal() {
    return false;
  }

  function checkWinningMove(row, col, marker) {
    if (
      checkHorizontal(row, marker) ||
      checkVertical(col, marker) ||
      checkdiagonal()
    ) {
      gameController.isWon = true;
      game.handleEndGame();
    }
  }

  function playMove(col, marker) {
    for (let i = numberOfRow - 1; i >= 0; i--) {
      if (_boardArray[i][col] === 0) {
        _boardArray[i][col] = marker;
        checkWinningMove(i, col, marker);
        break;
      }
    }
  }

  initBoard(numberOfRow, numberOfCol);

  return { getBoardArray, playMove };
}

function gameController() {
  const board = boardController(this);
  const display = displayController(this, board);
  let isWon = false;

  function player(name, marker) {
    return { name, marker };
  }

  const player1 = player("Player 1", 1);
  const player2 = player("Player 2", 2);

  let currentPlayer = player1;

  function takeTurn(column) {
    board.playMove(column, currentPlayer.marker);
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    display.refresh();
  }

  const handleEndGame = () => {
    display.endGameScreen(currentPlayer.name);
  };

  function restartGame() {
    board.initBoard();
    display.refresh();
  }

  /*while (!board.isWon) {
    takeTurn(display.askColumn(currentPlayer.name));
  }*/
  return { takeTurn, handleEndGame, isWon };
}

game = new gameController();
