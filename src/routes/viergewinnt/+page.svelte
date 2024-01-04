<script lang="ts">
    import { Board } from "$lib/VierGewinnt/VierGewinnt";
    import BoardView from "$lib/VierGewinnt/BoardView.svelte";

    let board = new Board(10, 12);
</script>

<main class="w-auto h-screen flex flex-col justify-start items-center gap-1 p-2">
    <div class="flex flex-1 relative justify-center items-stretch aspect-square">
        <BoardView bind:board={board} />
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