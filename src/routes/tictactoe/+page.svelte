<script lang="ts">
    import { Board, winnerToString } from "$lib/TicTacToe/TicTacToe";
    import BoardView from "$lib/TicTacToe/BoardView.svelte";

    let board = new Board(3);
    let currentPlayerString: string;
    $: currentPlayerString = winnerToString(board.sharedGameState.currentPlayer);
</script>

<main class="w-auto h-screen flex flex-col justify-start items-center gap-1 p-2">
    <span>Spieler an der Reihe: {currentPlayerString}</span>
    <BoardView bind:data={board} />
</main>