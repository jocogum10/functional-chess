export default function checkMate(gameboard, Checkobj) {
  let possibleMoves = 0;
  let canBeMoved = [];
  const kingRow = Checkobj.whereKing[0];
  const kingCol = Checkobj.whereKing[1];

  //if king can still move
  if (
    Checkobj.pieceWhichChecked.type.charAt(1) !== "q" ||
    Math.abs(Checkobj.pieceWhichChecked.row - kingRow) !== 1
  ) {
    console.log(Checkobj.pieceWhichChecked.type);
    if (kingRow !== 0 && kingCol !== 0) {
      if (
        gameboard[kingRow + 1][kingCol] === "" ||
        gameboard[kingRow - 1][kingCol] === "" ||
        gameboard[kingRow][kingCol + 1] === "" ||
        gameboard[kingRow][kingCol - 1] === "" ||
        gameboard[kingRow + 1][kingCol + 1] === "" ||
        gameboard[kingRow - 1][kingCol - 1] === "" ||
        gameboard[kingRow - 1][kingCol + 1] === "" ||
        gameboard[kingRow + 1][kingCol - 1] === ""
      ) {
        possibleMoves++;
        canBeMoved.push("king");
      }
    } else {
      if (
        gameboard[kingRow + 1][kingCol] === "" ||
        gameboard[kingRow][kingCol + 1] === "" ||
        gameboard[kingRow + 1][kingCol + 1] === ""
      ) {
        possibleMoves++;
        canBeMoved.push("king");
      }
    }
  }

  console.log("kingrow", kingRow);

  //if black is checked
  if (Checkobj.pieceWhichChecked.type.charAt(0) === "w") {
    if (kingRow !== 0) {
      gameboard[kingRow - 1].forEach((cell) => {
        if (cell.type === "br" || cell.type === "bq") {
          possibleMoves++;
          canBeMoved.push(cell);
        }
        if (cell.type === "bb") {
          if (Math.abs(kingCol - cell.column) === 3) {
            possibleMoves++;
            canBeMoved.push(cell);
          }
        }
      });
    }
    gameboard[kingRow].forEach((cell) => {
      if (cell.type === "br" || cell.type === "bq" || cell.type === "bb")
        possibleMoves++;

      if (cell.type === "bq" || cell.type === "br" || cell.type === "bp") {
        if (Math.abs(cell.column - kingCol) === 1) {
          possibleMoves++;
          canBeMoved.push(cell);
        }
      }
      if (cell.type === "bh") {
        if (Math.abs(cell.column - kingCol) === 3) {
          possibleMoves++;
          canBeMoved.push(cell);
        }
      }
    });

    gameboard[kingRow + 1].forEach((cell) => {
      if (cell.type === "br" || cell.type === "bq") possibleMoves++;
      if (cell.type === "bp") {
        if (
          Math.abs(kingCol - Checkobj.pieceWhichChecked.column) < cell.column &&
          Checkobj.pieceWhichChecked.column > cell.column
        ) {
          possibleMoves++;
          canBeMoved.push(cell);
        }
      }
    });

    console.log("possible moves: ", possibleMoves);
    console.log(canBeMoved);

    return possibleMoves;
  }
  //if white is checked
  else {
    if (kingRow !== 0) {
      gameboard[kingRow - 1].forEach((cell) => {
        if (cell.type === "wr" || cell.type === "wq") {
          possibleMoves++;
          canBeMoved.push(cell);
        }

        if (cell.type === "wb") {
          if (Math.abs(kingCol - cell.column) === 3) {
            possibleMoves++;
            canBeMoved.push(cell);
          }
        }
      });
    }
    gameboard[kingRow].forEach((cell) => {
      if (cell.type === "wr" || cell.type === "wq" || cell.type === "wb")
        possibleMoves++;
      if (cell.type === "wq" || cell.type === "wr" || cell.type === "wp") {
        if (Math.abs(cell.column - kingCol) === 1) {
          possibleMoves++;
          canBeMoved.push(cell);
        }
      }
      if (cell.type === "wh") {
        if (Math.abs(cell.column - kingCol) === 3) {
          possibleMoves++;
          canBeMoved.push(cell);
        }
      }
    });

    gameboard[kingRow + 1].forEach((cell) => {
      console.log(kingRow + 1);
      if (cell.type === "wr" || cell.type === "wq") possibleMoves++;
      if (cell.type === "wp") {
        if (
          Math.abs(kingCol - Checkobj.pieceWhichChecked.column) < cell.column &&
          Checkobj.pieceWhichChecked.column > cell.column
        ) {
          possibleMoves++;
          canBeMoved.push(cell);
        }
      }
    });

    console.log("possible moves: ", possibleMoves);
    console.log(canBeMoved);
    return possibleMoves;
  }
}
