// variables

// selectors
const app = document.getElementById("app");

// event listeners
window.addEventListener("load", () => {
  renderApp(app);
});

// functions
function renderApp(appElement) {
  // game
  let chessboard = new ChessBoard();
  chessboard.initialize();
  chessboard.renderBoard();
}

class ChessBoard {
  constructor() {
    this.board = [];
    this.capturedPieces = {
      'black': [],
      'white': []
    }
    this.pieceOnHand = "";
  }

  initialize() {
    this.capturedPieces = {
      'black': [],
      'white': []
    }

    //blacks
    const bb1 = new Bishop("bb1", 0, 2, "black", "bb");
    const bb2 = new Bishop("bb2", 0, 5, "black", "bb");

    const br1 = new Rook("br1", 0, 0, "black", "br");
    const br2 = new Rook("br2", 0, 7, "black", "br");

    const bq = new Queen("bq", 0, 4, "black", "bq");

    const bk1 = new King("bk1", 0, 3, "black", "bk");
    const bh1 = new Knight("bh1", 0, 1, "black", "bh");
    const bh2 = new Knight("bh2", 0, 6, "black", "bh");

    const bp0 = new Pawn("bp0", 1, 0, "black", "bp");
    const bp1 = new Pawn("bp1", 1, 1, "black", "bp");
    const bp2 = new Pawn("bp2", 1, 2, "black", "bp");
    const bp3 = new Pawn("bp3", 1, 3, "black", "bp");
    const bp4 = new Pawn("bp4", 1, 4, "black", "bp");
    const bp5 = new Pawn("bp5", 1, 5, "black", "bp");
    const bp6 = new Pawn("bp6", 1, 6, "black", "bp");
    const bp7 = new Pawn("bp7", 1, 7, "black", "bp");

    //whites
    const wp0 = new Pawn("wp0", 6, 0, "white", "wp");
    const wp1 = new Pawn("wp1", 6, 1, "white", "wp");
    const wp2 = new Pawn("wp2", 6, 2, "white", "wp");
    const wp3 = new Pawn("wp3", 6, 3, "white", "wp");
    const wp4 = new Pawn("wp4", 6, 4, "white", "wp");
    const wp5 = new Pawn("wp5", 6, 5, "white", "wp");
    const wp6 = new Pawn("wp6", 6, 6, "white", "wp");
    const wp7 = new Pawn("wp7", 6, 7, "white", "wp");

    const wb1 = new Bishop("wb1", 7, 5, "white", "wb");
    const wb2 = new Bishop("wb2", 7, 2, "white", "wb");

    const wr1 = new Rook("wr1", 7, 0, "white", "wr");
    const wr2 = new Rook("wr2", 7, 7, "white", "wr");

    const wq = new Queen("wq", 7, 4, "white", "wq");

    const wk1 = new King("wk1", 7, 3, "white", "wk");
    const wh1 = new Knight("wh1", 7, 1, "white", "wh");
    const wh2 = new Knight("wh2", 7, 6, "white", "wh");

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
        });
      });
    });
  }

  // -------------------------------------------------------
  // logic functions
  capturePiece(piece) {
    if(piece.color === 'black'){
      this.capturedPieces.black.push(piece);
    } else {
      this.capturedPieces.white.push(piece);
    }
    
    console.log("piece captured:", this.capturedPieces);
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
    if (this.pieceOnHand.isValidMove(newRow, newCol)) {

      // capture piece
      if (this.board[newRow][newCol] && this.board[newRow][newCol].color != this.pieceOnHand.color) {
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
      
    } else {
      this.board[oldRow][oldCol] = this.pieceOnHand;
      console.log("returning", this.pieceOnHand.id, "to", oldRow, oldCol);
    }

    this.pieceOnHand = "";

    this.renderBoard();
  }

  getPiece(position) {
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
}

class Pawn extends Piece {
  constructor(id, row, column, color, type) {
    super(id, row, column, color, type);
    this.firstMove = true;
  }
  isValidMove(newRow, newCol) {
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
}
