// variables

// selectors
const app = document.getElementById('app');

// event listeners
window.addEventListener('load', () => {renderApp(app)});

// functions
function renderApp (appElement){

    // game
    let chessboard = new ChessBoard();
    chessboard.initialize();
    chessboard.renderBoard();
    // const gameContainer = chessboard.renderBoard();
    
    // appElement.appendChild(gameContainer);
}


class ChessBoard {
    constructor () {
        this.board = [];
        this.capturedPieces = [];
        this.pieceOnHand = '';
    }

    initialize(){
        this.capturedPieces = [];

        const bp0 = new Pawn('bp0' , 1, 0, 'black', 'bp');
        const bp1 = new Pawn('bp1' , 1, 1, 'black', 'bp');
        const bp2 = new Pawn('bp2' , 1, 2, 'black', 'bp');
        const bp3 = new Pawn('bp3' , 1, 3, 'black', 'bp');
        const bp4 = new Pawn('bp4' , 1, 4, 'black', 'bp');
        const bp5 = new Pawn('bp5' , 1, 5, 'black', 'bp');
        const bp6 = new Pawn('bp6' , 1, 6, 'black', 'bp');
        const bp7 = new Pawn('bp7' , 1, 7, 'black', 'bp');

        const wp0 = new Pawn('wp0' , 6, 0, 'white', 'wp');
        const wp1 = new Pawn('wp1' , 6, 1, 'white', 'wp');
        const wp2 = new Pawn('wp2' , 6, 2, 'white', 'wp');
        const wp3 = new Pawn('wp3' , 6, 3, 'white', 'wp');
        const wp4 = new Pawn('wp4' , 6, 4, 'white', 'wp');
        const wp5 = new Pawn('wp5' , 6, 5, 'white', 'wp');
        const wp6 = new Pawn('wp6' , 6, 6, 'white', 'wp');
        const wp7 = new Pawn('wp7' , 6, 7, 'white', 'wp');

        this.board = [
            ['', '', '', '', '', '', '', ''],   //8
            [bp0, bp1, bp2, bp3, bp4, bp5, bp6, bp7],   //7
            ['', '', '', '', '', '', '', ''],   //6
            ['', '', '', '', '', '', '', ''],   //5
            ['', '', '', '', '', '', '', ''],   //4
            ['', '', '', '', '', '', '', ''],   //3
            [wp0, wp1, wp2, wp3, wp4, wp5, wp6, wp7],   //2
            ['', '', '', '', '', '', '', '']    //1
        //    a   b  c   d    e  f    g   h
        ]
        this.board.forEach( (rowArray, indexRow) => {
            rowArray.forEach( (columnCell, indexColumn) => {
                const btnElement = document.getElementById(`${indexRow}${indexColumn}`)
                btnElement.addEventListener('click', (event)=>{
                    this.clickedCell(event.target.id)
                });
            });
        });
    }

    // -------------------------------------------------------
    // logic functions
    capturePiece (piece) {
        this.capturedPieces.push(piece);
        console.log('piece captured:', this.capturedPieces)
    }
    placePiece(position) {
        // get clicked cell
        const rowIndex = position.split('')[0];
        const colIndex = position.split('')[1];

        // update object
        const oldRow = this.pieceOnHand.row
        const oldCol = this.pieceOnHand.column
        const newRow = parseInt(rowIndex);
        const newCol = parseInt(colIndex);
        if (this.pieceOnHand.isValidMove(newRow, newCol)) {
            this.pieceOnHand.row = newRow;
            this.pieceOnHand.column = newCol;
            
            // capture piece
            if (this.board[newRow][newCol]) {
                this.capturePiece(this.board[newRow][newCol]);
            }
            this.board[rowIndex][colIndex] = this.pieceOnHand;
            this.board[oldRow][oldCol] = '';
            console.log('placing', this.pieceOnHand.id, 'from', oldRow, oldCol, 'to', newRow, newCol);
        } else {
            this.board[oldRow][oldCol] = this.pieceOnHand;
            console.log('returning', this.pieceOnHand.id, 'to', oldRow, oldCol);
        }

        this.pieceOnHand = ''

        this.renderBoard();
    }

    getPiece(position){
        // get clicked cell
        const rowIndex = position.split('')[0];
        const colIndex = position.split('')[1];

        // get object of cell
        this.pieceOnHand = this.board[rowIndex][colIndex];
        console.log('getting', this.pieceOnHand.id, 'at', this.pieceOnHand.row, this.pieceOnHand.column)
    }

    clickedCell(piecePos){
        if (this.pieceOnHand) {
            this.placePiece(piecePos)
        } else {
            this.getPiece(piecePos)
        }
    }
    // end logic functions
    // -------------------------------------------------------

    // -------------------------------------------------------
    // view functions
    renderBoard(){
        const gameContainer = document.getElementById('game');

        this.board.forEach( (rowArray, indexRow) => {
            rowArray.forEach( (columnCell, indexColumn) => {
                
                // get item

                const pieceObject = this.board[indexRow][indexColumn];
                const pieceToPlace = pieceObject ? pieceObject.type : '';
                
                const pieceColor = pieceToPlace.split('')[0];
                const pieceType = pieceToPlace.split('')[1];
                const btnElement = document.getElementById(`${indexRow}${indexColumn}`)

                // place the pieces
                while(btnElement.firstChild) {
                    btnElement.removeChild(btnElement.firstChild)
                }

                if (pieceToPlace) {
                    const pieceSVG = document.createElement('i');
                    pieceSVG.setAttribute('class', 'fa-solid');
                    // console.log(pieceSVG)
                    switch(pieceType) {
                        case 'p':
                            pieceSVG.classList.add("fa-chess-pawn");
                            break;
                        case 'r':
                            pieceSVG.classList.add("fa-chess-rook");
                            break;
                        case 'h':
                            pieceSVG.classList.add("fa-chess-knight");
                            break;
                        case 'b':
                            pieceSVG.classList.add("fa-chess-bishop");
                            break;
                        case 'k':
                            pieceSVG.classList.add("fa-chess-king");
                            break;
                        case 'q':
                            pieceSVG.classList.add("fa-chess-queen");
                            break;
                        default:
                            console.log();
                    }
                    switch(pieceColor) {
                        case 'w':
                            pieceSVG.classList.add("white-player");
                            break;
                        case 'b':
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


class Piece {
    constructor (test) {
        this.test = test
    }
    moveRules () {
        console.log('move rules')
    }

}

class Pawn extends Piece {
    constructor (id, row, column, color, type) {
        super('test')
        this.id = id;
        this.row = row;
        this.column = column;
        this.color = color;
        this.type = type;
        this.firstMove = false;
    }
    isValidMove(newRow, newCol) {
        if(this.color == 'black') {
            if(newRow === this.row + 1 && newCol === this.column){
                return true;
            }
            return false;
        } else {
            if(newRow === this.row - 1 && newCol === this.column){
                return true;
            }
            return false;
        }
    }
}