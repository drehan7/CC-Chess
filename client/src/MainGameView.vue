<script setup>
    import ChessBoard from "./components/ChessBoard.vue";

    // const DEFAULT_FEN = "rnb1kbnr/pp3pp1/4p3/p2p4/1N2PP1p/3P1q2/PPP3PP/R1BQKBNR w KQkq - 0 1";
     const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

</script>

<template>
  <h2>CC Chessboard</h2>
  <ChessBoard :fen="DEFAULT_FEN"/>
</template>
