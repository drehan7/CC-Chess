<script setup>
    import { ref, reactive, computed } from "vue";
    import { 
        GenerateBoardSquares,
        GenerateFenFromBoard,
        GetSquareColor,
        InitBoardState,
        InitFenObject,
        PieceMap,
    } from "../utils/chessutils";

    //const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const DEFAULT_FEN = "rnb1kbnr/pp3pp1/4p3/p2p4/1N2PP1p/3P1q2/PPP3PP/R1BQKBNR w KQkq - 0 1";

    const BoardState = reactive(InitBoardState( DEFAULT_FEN ));
    let selectedSquare = ref("");

    const flipped = ref(false);

    function flip() {
        BoardState.boardSquares.reverse();
        flipped.value = !flipped.value;
    }

    // Based on current FEN string, figure out what coord has what piece
    function getPiece( square ) {
        const key = BoardState.boardMap[square];
        return PieceMap[key];
    }

    function isSelected( square ) {
        return ( selectedSquare.value === square ) ? "selected": "";
    }

    function updateFen() {
        BoardState.fenObj = GenerateFenFromBoard( BoardState );
    }

    function handleSquareClick( square ) {
        const currSquarePiece = BoardState.boardMap[square];
        if ( !selectedSquare.value.length ) {
            if ( currSquarePiece !== " " ) {
                selectedSquare.value = square;
                return;
            }
        }

        // Swap current selected with new square
        const tmp = BoardState.boardMap[selectedSquare.value];
        BoardState.boardMap[selectedSquare.value] = " ";
        BoardState.boardMap[square] = tmp;
        selectedSquare.value = "";

        updateFen( );
    }

    const getCurrentSelected = computed(() => {
        return selectedSquare.value;
    })

    const getCurrentFEN = computed(() => {
        return BoardState.fenObj.fullFen;
    })

</script>

<template>
    <h1> ChessBoard </h1>
    <h2 @click="console.log(selectedSquare)">Selected Square: {{ getCurrentSelected || "None" }}</h2>
    <h2>{{ BoardState.fenObj.fullFen }}</h2>
    <h2>{{ BoardState.fenObj.turn === "w" ? "White" : "Black"}} to move</h2>
    <button @click="flip">{{ flipped ? "Black" : "White" }} view</button>
    <TransitionGroup key="board">
        <div class="chessboard" key="_board">
            <div 
                v-for="s in BoardState.boardSquares"
                :key="s"
                class="square"
                :class="[GetSquareColor(s), isSelected(s)]"
                @click="handleSquareClick(s)">
                <img 
                    class="piece" 
                    :src="getPiece(s)" 
                    alt=""
                />
                <div class="square-annotation">
                    {{s}}
                </div>
            </div>
        </div>
    </TransitionGroup>
</template>
<style scoped>

    .chessboard {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
    }
    .square-annotation {
        position: absolute;
        border: 1px solid red;
        width: 10%;
        height: 10%;
        margin-bottom: 10px;
        z-index: 999;
    }
    .piece {
        position: relative;
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        border: 2px solid blue;
        padding: 1rem;
    }
    .selected {
        opacity: 0.5;
    }
    .square {
        display: flex;
        position: relative;
        margin: 0;
        padding: 0;
        color: black;
        width: 10rem;
        height: 10rem;
    }
    .light {
        background: #eab676;
    }
    .dark {
        background: #873e23;
    }

</style>
