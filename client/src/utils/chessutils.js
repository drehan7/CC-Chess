const CHARCODE_OFFSET = 97;

export function GenerateFenFromBoard() {}
export function GenerateBoardFromFen() {}

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

// Return either "light" or "dark"
export function GetSquareColor( squareKey ) {
    const coord = convertToCoordinate( squareKey );
    const color = ( coord.row % 2 == 0 ) 
        ? ( coord.col % 2 == 0 ) ? "light" : "dark"
        : ( coord.col % 2 == 0 ) ? "dark" : "light";


    return color;
}
