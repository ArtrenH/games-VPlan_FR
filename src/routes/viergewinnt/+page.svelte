<script lang="ts">
    import { Board, Winner, winnerToString } from "$lib/VierGewinnt/VierGewinnt";
    import BoardView from "$lib/VierGewinnt/BoardView.svelte";
    import NavContentLayout from "$lib/NavContentLayout.svelte";
    import { Button, DropdownItem } from "flowbite-svelte";

    let board = new Board(10, 12);
    let barColor: Winner;
    $: barColor = board.getWinner() === Winner.Pending ? board.currentPlayer : board.getWinner();
</script>

<NavContentLayout>
    <span class="font-semibold relative mb-2 text-nowrap db-accent-line" class:red={barColor === Winner.Red} class:yellow={barColor === Winner.Yellow}>
        {#if board.getWinner() === Winner.Pending}
            Spieler an der Reihe: {winnerToString(board.currentPlayer)}
        {:else if board.getWinner() === Winner.Draw}
            Unentschieden 🤯
        {:else}
            {winnerToString(board.getWinner())} hat gewonnen :D 🎉🎉🎉
        {/if}
    </span>
    <div class="flex flex-1 relative justify-center items-stretch aspect-square">
        <BoardView bind:board={board} />
    </div>
    <div slot="settings">
        <DropdownItem>
            <Button on:click={() => {board = new Board(10, 12)}} class="w-full">Board resetten</Button>
        </DropdownItem>
    </div>
</NavContentLayout>

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
        transition: background .2s ease;
        border-radius: 999vw;
    }

    .db-accent-line.red::after {
        background: #e60000;
    }
    
    .db-accent-line.yellow::after {
        background: #e6d700;
    }
</style>