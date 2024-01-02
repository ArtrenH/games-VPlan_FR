<script lang="ts">
    import { Board } from "$lib/TicTacToe/TicTacToe";
    import BoardView from "$lib/TicTacToe/BoardView.svelte";

    let board = new Board(3);
</script>

<main>
    <BoardView data={board} />
</main>