<script setup>
    import { ref } from "vue";
    import { 
        GenerateBoardSquares,
        GetSquareColor,
        InitBoardState,
        PieceMap,
    } from "../utils/chessutils";

    const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    //const DEFAULT_FEN = "rnbqkbnr/ppp2ppp/4p3/3p4/4PP2/3P4/PPP3PP/RNBQKBNR b KQkq f3 0 1";

    // FEN string
    const sq = ref(GenerateBoardSquares());
    const BoardState = ref(InitBoardState( DEFAULT_FEN, sq.value ));

    const flipped = ref(false);
    console.log(sq);

    function flip() {
        sq.value.reverse();
        flipped.value = !flipped.value;
    }

    // Based on current FEN string, figure out what coord has what piece
    function getPiece( square ) {
        const key = BoardState.value.boardMap[square];
        return PieceMap[key];
    }

</script>

<template>
    <h1> ChessBoard </h1>
    <h2>{{(BoardState.value && BoardState.value.whiteToMove) ? "White" : "Black"}} to move</h2>
    <button @click="flip">{{ flipped ? "Black" : "White" }} view</button>
    <div class="chessboard">
        <div 
            v-for="s in sq"
            :key="s"
            class="square"
            :class="GetSquareColor(s)"
            @click="console.log(s)">
            <img class="piece ":src="getPiece(s)" alt="piece" />
            <div class="square-annotation">
                {{s}}
            </div>
        </div>
    </div>
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
