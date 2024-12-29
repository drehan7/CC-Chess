<script setup>
    // Make a grid of div containers matching a-h 1-8
    // TODO: Colors
    import { ref } from "vue";
    import { GenerateBoardSquares, GetSquareColor } from "../utils/chessutils";

    const sq = ref(GenerateBoardSquares());
    const flipped = ref(false);
    console.log(sq);

    function flip() {
        sq.value.reverse();
        flipped.value = !flipped.value;
    }

</script>

<template>
    <h1> ChessBoard </h1>
    <button @click="flip">{{ flipped ? "Black" : "White" }} view</button>
    <div class="chessboard">
        <div 
            v-for="s in sq"
            :key="s"
            class="square"
            :class="GetSquareColor(s)"
            @click="console.log(s)">
            {{ s }}
        </div>
    </div>
</template>
<style scoped>
    .chessboard {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
    }
    .square {
        color: black;
        width: 7rem;
        height: 7rem;
    }
    .light {
        background: #eab676;
    }
    .dark {
        background: #873e23;
    }
</style>
