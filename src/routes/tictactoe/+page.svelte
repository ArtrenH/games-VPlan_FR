<script lang="ts">
    import { Board, Winner, winnerToString } from "$lib/TicTacToe/TicTacToe";
    import BoardView from "$lib/TicTacToe/BoardView.svelte";

    let board = new Board(1);
    let currentPlayerString: string;
    $: currentPlayerString = winnerToString(board.sharedGameState.currentPlayer);
</script>

<main class="w-auto h-screen flex flex-col justify-start items-center gap-1 p-2">
    <span class="font-semibold relative mb-2 db-accent-line">
    {#if board.getWinner() === Winner.Pending}
        Spieler an der Reihe: {currentPlayerString}
    {:else}
        {winnerToString(board.getWinner())} hat gewonnen :D 🎉🎉🎉
    {/if}
    </span>
    <div class="flex flex-1 relative justify-center items-stretch aspect-square">
        <BoardView bind:data={board} />
    </div>
</main>

<style lang="postcss">
    .db-accent-line::after {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(100%);
        content: "";
        width: 100%;
        height: 0.35rem;
        background: #e69900;
        border-radius: 999vw;
    }
</style>