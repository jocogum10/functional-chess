// variables
let bb1;
let bb2;
let br1;
let br2;
let bq;
let bk1;
let bh1;
let bh2;
let bp0;
let bp1;
let bp2;
let bp3;
let bp4;
let bp5;
let bp6;
let bp7;
//whites
let wp0;
let wp1;
let wp2;
let wp3;
let wp4;
let wp5;
let wp6;
let wp7;
let wb1;
let wb2;
let wr1;
let wr2;
let wq;
let wk1;
let wh1;
let wh2;

let chessboard;

// selectors
// const app = document.getElementById("app");

// // event listeners
// window.addEventListener("load", () => {
//   renderApp(app);
// });

class ChessBoard {
  constructor() {
    this.board = [];
    this.capturedPieces = {
      black: [],
      white: [],
    };
    this.pieceOnHand = "";
    this.playerWhiteTurn = false;
  }

  initialize(doesWhiteStart) {
    this.playerWhiteTurn = doesWhiteStart;
    document.getElementById("player-turn").textContent = this.playerWhiteTurn
      ? "Player Turn: White"
      : "Player Turn: Black";
    this.capturedPieces = {
      black: [],
      white: [],
    };

    //blacks
    bb1 = new Bishop("bb1", 0, 2, "black", "bb");
    bb2 = new Bishop("bb2", 0, 5, "black", "bb");

    br1 = new Rook("br1", 0, 0, "black", "br");
    br2 = new Rook("br2", 0, 7, "black", "br");

    bq = new Queen("bq", 0, 4, "black", "bq");

    bk1 = new King("bk1", 0, 3, "black", "bk");
    bh1 = new Knight("bh1", 0, 1, "black", "bh");
    bh2 = new Knight("bh2", 0, 6, "black", "bh");

    bp0 = new Pawn("bp0", 1, 0, "black", "bp");
    bp1 = new Pawn("bp1", 1, 1, "black", "bp");
    bp2 = new Pawn("bp2", 1, 2, "black", "bp");
    bp3 = new Pawn("bp3", 1, 3, "black", "bp");
    bp4 = new Pawn("bp4", 1, 4, "black", "bp");
    bp5 = new Pawn("bp5", 1, 5, "black", "bp");
    bp6 = new Pawn("bp6", 1, 6, "black", "bp");
    bp7 = new Pawn("bp7", 1, 7, "black", "bp");

    //whites
    wp0 = new Pawn("wp0", 6, 0, "white", "wp");
    wp1 = new Pawn("wp1", 6, 1, "white", "wp");
    wp2 = new Pawn("wp2", 6, 2, "white", "wp");
    wp3 = new Pawn("wp3", 6, 3, "white", "wp");
    wp4 = new Pawn("wp4", 6, 4, "white", "wp");
    wp5 = new Pawn("wp5", 6, 5, "white", "wp");
    wp6 = new Pawn("wp6", 6, 6, "white", "wp");
    wp7 = new Pawn("wp7", 6, 7, "white", "wp");

    wb1 = new Bishop("wb1", 7, 5, "white", "wb");
    wb2 = new Bishop("wb2", 7, 2, "white", "wb");

    wr1 = new Rook("wr1", 7, 0, "white", "wr");
    wr2 = new Rook("wr2", 7, 7, "white", "wr");

    wq = new Queen("wq", 7, 4, "white", "wq");

    wk1 = new King("wk1", 7, 3, "white", "wk");
    wh1 = new Knight("wh1", 7, 1, "white", "wh");
    wh2 = new Knight("wh2", 7, 6, "white", "wh");

    this.board = [
      [br1, bh1, bb1, bk1, bq, bb2, bh2, br2], //8
      [bp0, bp1, bp2, bp3, bp4, bp5, bp6, bp7], //7
      ["", "", "", "", "", "", "", ""], //6
      ["", "", "", "", "", "", "", ""], //5
      ["", "", "", "", "", "", "", ""], //4
      ["", "", "", "", "", "", "", ""], //3
      [wp0, wp1, wp2, wp3, wp4, wp5, wp6, wp7], //2
      [wr1, wh1, wb2, wk1, wq, wb1, wh2, wr2], //1
      //    a   b  c   d    e  f    g   h
    ];
    this.board.forEach((rowArray, indexRow) => {
      rowArray.forEach((columnCell, indexColumn) => {
        const btnElement = document.getElementById(`${indexRow}${indexColumn}`);
        btnElement.addEventListener("click", (event) => {
          this.clickedCell(event.target.id);

          this.playerWhiteTurn
            ? (document.getElementById("player-turn").textContent =
                "Player Turn: White")
            : (document.getElementById("player-turn").textContent =
                "Player Turn: Black");
        });
      });
    });
  }

  // -------------------------------------------------------
  // logic functions
  capturePiece(piece) {
    if (piece.color === "black") {
      this.capturedPieces.black.push(piece);
    } else {
      this.capturedPieces.white.push(piece);
    }

    console.log("piece captured:", this.capturedPieces);
    this.renderCaptured();
  }
  placePiece(position) {
    // get clicked cell
    const rowIndex = position.split("")[0];
    const colIndex = position.split("")[1];

    // update object
    const oldRow = this.pieceOnHand.row;
    const oldCol = this.pieceOnHand.column;
    const newRow = parseInt(rowIndex);
    const newCol = parseInt(colIndex);
    console.log(this.pieceOnHand.color, this.playerWhiteTurn);
    const whitePlayerMove = this.pieceOnHand.color === "white" ? true : false;

    if (
      this.pieceOnHand.isValidMove(newRow, newCol) &&
      this.playerWhiteTurn === whitePlayerMove
    ) {
      // capture piece
      if (
        this.board[newRow][newCol] &&
        this.board[newRow][newCol].color != this.pieceOnHand.color
      ) {
        this.capturePiece(this.board[newRow][newCol]);
      } else {
        this.board[oldRow][oldCol] = this.pieceOnHand;
        console.log("returning", this.pieceOnHand.id, "to", oldRow, oldCol);
      }

      this.pieceOnHand.row = newRow;
      this.pieceOnHand.column = newCol;
      this.board[rowIndex][colIndex] = this.pieceOnHand;
      this.board[oldRow][oldCol] = "";
      console.log(
        "placing",
        this.pieceOnHand.id,
        "from",
        oldRow,
        oldCol,
        "to",
        newRow,
        newCol
      );

      console.log(this.pieceOnHand);
      if (this.playerWhiteTurn) {
        const blackChecked = this.pieceOnHand.isChecked(bk1.row, bk1.column);
        console.log("blackChecked", blackChecked);
      } else {
        const whiteChecked = this.pieceOnHand.isChecked(wk1.row, wk1.column);
        console.log("whiteChecked", whiteChecked);
      }

      this.playerWhiteTurn = !this.playerWhiteTurn;
    } else {
      this.board[oldRow][oldCol] = this.pieceOnHand;
      console.log("returning", this.pieceOnHand.id, "to", oldRow, oldCol);
    }

    this.pieceOnHand = "";
    console.log("player turn:", this.playerWhiteTurn ? "white" : "black");
    this.renderBoard();
  }
  getPiece(position) {
    const currentCell = document.getElementById(position);

    if (currentCell.firstChild) {
      currentCell.firstChild.classList.add("blinking");
    }

    // get clicked cell
    const rowIndex = position.split("")[0];
    const colIndex = position.split("")[1];

    // get object of cell
    this.pieceOnHand = this.board[rowIndex][colIndex];
    console.log(
      "getting",
      this.pieceOnHand.id,
      "at",
      this.pieceOnHand.row,
      this.pieceOnHand.column
    );
  }

  clickedCell(piecePos) {
    if (this.pieceOnHand) {
      this.placePiece(piecePos);
    } else {
      this.getPiece(piecePos);
    }
  }
  // end logic functions
  // -------------------------------------------------------

  // -------------------------------------------------------
  // view functions
  renderCaptured() {
    const captureWhite = document.querySelector(".captured-by-white");
    const captureBlack = document.querySelector(".captured-by-black");

    captureBlack.innerHTML = "";
    captureWhite.innerHTML = "";

    this.capturedPieces.black.forEach((id) => {
      const newCell = document.createElement("span");
      newCell.classList.add("captured-piece-cell");
      newCell.classList.add("fa-solid");
      switch (id.type.charAt(1)) {
        case "p":
          newCell.classList.add("fa-chess-pawn");
          break;
        case "r":
          newCell.classList.add("fa-chess-rook");
          break;
        case "h":
          newCell.classList.add("fa-chess-knight");
          break;
        case "b":
          newCell.classList.add("fa-chess-bishop");
          break;
        case "k":
          newCell.classList.add("fa-chess-king");
          break;
        case "q":
          newCell.classList.add("fa-chess-queen");
          break;
        default:
          console.log();
      }
      newCell.style.color = "black";
      captureWhite.append(newCell);
    });
    this.capturedPieces.white.forEach((id) => {
      const newCell = document.createElement("span");
      newCell.classList.add("captured-piece-cell");
      newCell.classList.add("fa-solid");
      switch (id.type.charAt(1)) {
        case "p":
          newCell.classList.add("fa-chess-pawn");
          break;
        case "r":
          newCell.classList.add("fa-chess-rook");
          break;
        case "h":
          newCell.classList.add("fa-chess-knight");
          break;
        case "b":
          newCell.classList.add("fa-chess-bishop");
          break;
        case "k":
          newCell.classList.add("fa-chess-king");
          break;
        case "q":
          newCell.classList.add("fa-chess-queen");
          break;
        default:
          console.log();
      }
      newCell.style.color = "white";
      captureBlack.append(newCell);
    });
  }

  renderBoard() {
    const gameContainer = document.getElementById("game");

    this.board.forEach((rowArray, indexRow) => {
      rowArray.forEach((columnCell, indexColumn) => {
        // get item
        const pieceObject = this.board[indexRow][indexColumn];
        const pieceToPlace = pieceObject ? pieceObject.type : "";

        const pieceColor = pieceToPlace.split("")[0];
        const pieceType = pieceToPlace.split("")[1];
        const btnElement = document.getElementById(`${indexRow}${indexColumn}`);

        // place the pieces
        while (btnElement.firstChild) {
          btnElement.removeChild(btnElement.firstChild);
        }

        if (pieceToPlace) {
          const pieceSVG = document.createElement("i");
          pieceSVG.setAttribute("class", "fa-solid");
          // console.log(pieceSVG)
          switch (pieceType) {
            case "p":
              pieceSVG.classList.add("fa-chess-pawn");
              break;
            case "r":
              pieceSVG.classList.add("fa-chess-rook");
              break;
            case "h":
              pieceSVG.classList.add("fa-chess-knight");
              break;
            case "b":
              pieceSVG.classList.add("fa-chess-bishop");
              break;
            case "k":
              pieceSVG.classList.add("fa-chess-king");
              break;
            case "q":
              pieceSVG.classList.add("fa-chess-queen");
              break;
            default:
              console.log();
          }
          switch (pieceColor) {
            case "w":
              pieceSVG.classList.add("white-player");
              break;
            case "b":
              pieceSVG.classList.add("black-player");
              break;
            default:
              console.log();
          }

          btnElement.appendChild(pieceSVG);
        }
        gameContainer.appendChild(btnElement);
      });
    });
    app.appendChild(gameContainer);
  }
  // end view functions
  // -------------------------------------------------------
}

// --------------------

class Piece {
  constructor(id, row, column, color, type) {
    this.id = id;
    this.row = row;
    this.column = column;
    this.color = color;
    this.type = type;
  }
  moveRules() {
    console.log("move rules");
  }
  isChecked() {
    return false;
  }
}

class Pawn extends Piece {
  constructor(id, row, column, color, type) {
    super(id, row, column, color, type);
    this.firstMove = true;
  }
  isValidMove(newRow, newCol) {
    console.log(this.firstMove);
    if (this.color == "black") {
      if (this.firstMove === true) {
        if (newRow <= this.row + 2 && newCol === this.column) {
          this.firstMove = false;
          return true;
        } else {
          return false;
        }
      }
      if (newRow === this.row + 1 && newCol === this.column) {
        return true;
      }
      return false;
    } else {
      if (this.firstMove === true) {
        if (newRow <= this.row + 2 && newCol === this.column) {
          this.firstMove = false;
          return true;
        } else {
          return false;
        }
      }
      if (newRow === this.row - 1 && newCol === this.column) {
        return true;
      }
      return false;
    }
  }
}

class King extends Piece {
  constructor(id, row, column, color, type) {
    super(id, row, column, color, type);
  }
  isValidMove(newRow, newCol) {
    if (Math.abs(newRow - this.row) === 1) {
      if (Math.abs(newCol - this.column) <= 1) {
        return true;
      }
      return false;
    } else if (Math.abs(newCol - this.column) === 1) {
      if (Math.abs(newRow - this.row) <= 1) {
        return true;
      }
      return false;
    }
    return false;
  }
}

class Bishop extends Piece {
  constructor(id, row, column, color, type) {
    super(id, row, column, color, type);
  }
  isValidMove(newRow, newCol) {
    if (Math.abs(this.column - newCol) === Math.abs(this.row - newRow))
      return true;
    return false;
  }
}

class Rook extends Piece {
  constructor(id, row, column, color, type) {
    super(id, row, column, color, type);
  }
  isValidMove(newRow, newCol) {
    if (Math.abs(newRow < this.row || newRow > this.row)) {
      if (Math.abs(newCol === this.column)) {
        return true;
      }
      return false;
    }
    if (newRow === this.row) {
      if (newCol != this.column) {
        return true;
      }
    }
    return false;
  }
}

class Knight extends Piece {
  constructor(id, row, column, color, type) {
    super(id, row, column, color, type);
  }
  isValidMove(newRow, newCol) {
    if (Math.abs(newRow - this.row) === 2) {
      if (Math.abs(newCol - this.column) === 1) {
        return true;
      }
      return false;
    } else if (Math.abs(newCol - this.column) === 2) {
      if (Math.abs(newRow - this.row) === 1) {
        return true;
      }
      return false;
    }
    return false;
  }
}

class Queen extends Piece {
  constructor(id, row, column, color, type) {
    super(id, row, column, color, type);
  }
  isValidMove(newRow, newCol) {
    //move like bishop
    if (Math.abs(this.column - newCol) === Math.abs(this.row - newRow))
      return true;
    //move like rook
    if (newRow != this.row && newCol === this.column) return true;
    if (newRow === this.row && newCol != this.column) return true;
    return false;
  }
  // check all possible moves if king is in one of them
  isChecked(enemyKingRow, enemyKingCol) {
    if (this.isValidMove(enemyKingRow, enemyKingCol)) {
      // up direction
      if (enemyKingCol === this.column && enemyKingRow < this.row) {
        for (let i = this.row - 1; i > enemyKingRow; i--) {
          const pieceChecked = chessboard.board[i][this.column];
          if (
            pieceChecked &&
            (pieceChecked.type != "bk" || pieceChecked.type != "wk")
          ) {
            return false;
          }
        }
        return true;
      } // down direction
      else if (enemyKingCol === this.column && enemyKingRow > this.row) {
        for (let i = this.row + 1; i < enemyKingRow; i++) {
          const pieceChecked = chessboard.board[i][this.column];
          if (
            pieceChecked &&
            (pieceChecked.type != "bk" || pieceChecked.type != "wk")
          ) {
            return false;
          }
        }
        return true;
      }

      //left direction
      else if (enemyKingCol < this.column && enemyKingRow === this.row) {
        for (let i = this.column - 1; i < enemyKingCol; i--) {
          const pieceChecked = chessboard.board[this.row][i];
          if (
            pieceChecked &&
            (pieceChecked.type != "bk" || pieceChecked.type != "wk")
          ) {
            return false;
          }
        }
        return true;
      }

      //right direction
      else if (enemyKingCol > this.column && enemyKingRow === this.row) {
        for (let i = this.column + 1; i < enemyKingCol; i++) {
          const pieceChecked = chessboard.board[i][this.column];
          if (
            pieceChecked &&
            (pieceChecked.type != "bk" || pieceChecked.type != "wk")
          ) {
            return false;
          }
        }
        return true;
      }
    }

    return false;
  }
}

// functions
export default function renderApp(appElement, doesWhiteStart) {
  // game
  chessboard = new ChessBoard();
  chessboard.initialize(doesWhiteStart);
  chessboard.renderBoard();
}
