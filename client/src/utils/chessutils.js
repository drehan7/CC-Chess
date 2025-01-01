const CHARCODE_OFFSET = 97;

export const PieceMap = {
    "r": "/assets/b-rook.png",
    "n": "/assets/b-knight.png",
    "b": "/assets/b-bishop.png",
    "q": "/assets/b-queen.png",
    "k": "/assets/b-king.png",
    "p": "/assets/b-pawn.png",

    "R": "/assets/w-rook.png",
    "N": "/assets/w-knight.png",
    "B": "/assets/w-bishop.png",
    "Q": "/assets/w-queen.png",
    "K": "/assets/w-king.png",
    "P": "/assets/w-pawn.png",
};

function isCharNumber(char) {
    return char >= '0' && char <= '9';
}

// Turn standard FEN to easier to use fen string
// Convert numbers to spaces, remove slashes
function toUsableFen(fen) {
    let retFen = "";
    let boardOnlyFen = fen.split(" ")[0];
    boardOnlyFen = boardOnlyFen.replace(/\//g, '');

    for ( let i = 0; i < boardOnlyFen.length; i++ ) {
        if ( isCharNumber(boardOnlyFen[i]) ) {
            for ( let j = 0; j < parseInt(boardOnlyFen[i]); j++) {
                retFen += " ";
            }
        }
        else {
            retFen += boardOnlyFen[i];
        }
    }

    return retFen;
}

function DetermineTurnFromFen( fen ) {
    const turn = fen.split(" ")[1];

    return turn;
}

function CreateFenBoardRepresentation( boardMap ) {
    let retFen = "";
    const pieces = Object.values( boardMap );
    let count = 0;

    // Generate just board representation of fen
    for ( let i = 0; i < pieces.length; i++ ) {
        const piece = pieces[i];
        count++;

        if ( piece !== " " ) {
            retFen += piece;
        }
        else {
            let y = i;
            let blankCount = 0;
            while ( pieces[y] === " " ) {
                blankCount++;
                y++;
                if ( (count + blankCount -1) % 8 === 0 ) {
                    break;
                }
            }
            i = y-1;
            retFen += blankCount.toString();
            count += blankCount - 1;
        }

        if ( count % 8 === 0 && i !== pieces.length - 1) {
            retFen += "/";
            count = 0;
        }
    }

    return retFen;
}

function ReconstructFullFen( fenObj ) {
    const fenSections = [ 
        fenObj.board,
        fenObj.turn,
        fenObj.castling,
        fenObj.halfMoves,
        fenObj.fullMoves 
    ];

    const rawFen = fenSections.join(" ");

    return rawFen;
}

function toggleTurn( prevTurn ) {
    return ( prevTurn === "w" ) ? "b" : "w";
}

// Create updated FenObj from current boardstate
export function GenerateFenFromBoard( boardState ) {
    const updatedFenObj = boardState.fenObj;
    updatedFenObj.board = CreateFenBoardRepresentation( boardState.boardMap );
    updatedFenObj.turn = toggleTurn( updatedFenObj.turn );
    updatedFenObj.fullFen = ReconstructFullFen( updatedFenObj );

    // TODO: Update with chess engine
    // For now, just maintain save move counters and castling

    return updatedFenObj;
}

export function GenerateBoardFromFen( fen ) {
    // Array of coordinates -- [a1, a2 ...]
    const boardArr = GenerateBoardSquares();

    const tmpFen = toUsableFen( fen );

    // Map coord to fen character
    const boardMap = {};

    for ( let i = 0; i < boardArr.length; i++ ) {
        boardMap[boardArr[i]] = tmpFen[i];
    }

    console.log("BOARDMAP", boardMap);
    return boardMap;
}

export function UpdateBoardWithFen(fen, board) {
}

// Create Array of strings corresponding to chess board
// i.e. a1 a2 -- h7 h8
export function GenerateBoardSquares() {
    // const alpha = "abcdefgh".split("");
    const alpha = "hgfedcba".split("");
    const nums = "12345678".split("");
    const ret = [];
    for ( let i = 0; i < alpha.length; i++ ) {
        for ( let j = 0; j < nums.length; j++ ) {
            ret.push(`${alpha[i]}${nums[j]}`);
        }
    }
    return ret;
}

function convertToCoordinate(squareKey) {
    const [ alpha, num ] = squareKey.split("");
    const cc = alpha.charCodeAt(0) - CHARCODE_OFFSET;
    return { row: cc, col: num };
}

// Construct object describing states based off FEN
//rnb1kbnr/pp3pp1/4p3/p2p4/1N2PP1p/3P1q2/PPP3PP/R1BQKBNR w KQkq - 0 1
export function InitFenObject( rawFenString ) {
    const fenDecon = rawFenString.split(" ");
    const FenObj = {
        fullFen: rawFenString,
        board: fenDecon[0],
        turn: fenDecon[1],
        castling: fenDecon[2],
        enPassant: fenDecon[3],
        halfMoves: parseInt(fenDecon[4]),
        fullMoves: parseInt(fenDecon[5]),
    };

    return FenObj;
}

// Return either "light" or "dark"
export function GetSquareColor( squareKey ) {
    const coord = convertToCoordinate( squareKey );
    const color = ( coord.row % 2 == 0 ) 
        ? ( coord.col % 2 == 0 ) ? "light" : "dark"
        : ( coord.col % 2 == 0 ) ? "dark" : "light";

    return color;
}

export function InitBoardState( fen ) {

    // Map of board coord to fen letter;
    const boardMap = GenerateBoardFromFen(fen)
    const whiteToMove = DetermineTurnFromFen(fen) === "w";
    const fenObj = InitFenObject( fen );

    const BoardState = {
        fen, // DEPRECATED
        fenObj,
        boardMap,
        boardSquares: GenerateBoardSquares(),
        whiteToMove,
    }

    return BoardState;
}
