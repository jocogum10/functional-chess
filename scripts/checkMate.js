export default function checkMate(gameboard, Checkobj) {
  let possibleMoves = 0;
  const kingRow = Checkobj.whereKing[0];
  const kingCol = Checkobj.whereKing[1];

  if (
    gameboard[kingRow][kingCol + 1].type === "bq" ||
    gameboard[kingRow][kingCol + 1].type === "br" ||
    gameboard[kingRow][kingCol + 1].type === "bp" ||
    gameboard[kingRow][kingCol - 1].type === "br" ||
    gameboard[kingRow][kingCol - 1].type === "bq" ||
    gameboard[kingRow][kingCol - 1].type === "br"
  ) {
    possibleMoves++;
  }
  gameboard[Checkobj.whereKing[0] + 1].forEach((cell) => {
    //if (cell.type === "br" || cell.type === "bq") possibleMoves++;

    if (cell.type === "bp") {
      if (
        Math.abs(kingCol - Checkobj.pieceWhichChecked.column) < cell.column &&
        Checkobj.pieceWhichChecked.column > cell.column
      ) {
        console.log(cell);
        possibleMoves++;
      }
    }
  });

  console.log("possible moves: ", possibleMoves);
  return possibleMoves;
}
