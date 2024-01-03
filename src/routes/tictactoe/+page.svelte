<script lang="ts">
    import { Board } from "$lib/TicTacToe/TicTacToe";
    import BoardView from "$lib/TicTacToe/BoardView.svelte";

    let board = new Board(3);
</script>

<main class="w-auto h-screen flex justify-center items-center">
    <BoardView data={board} />
</main>