<script lang="ts">
    import { Board, Winner, winnerToString } from "$lib/TicTacToe/TicTacToe";
    import BoardView from "$lib/TicTacToe/BoardView.svelte";
    import NavContentLayout from "$lib/NavContentLayout.svelte";
    import { Button, DropdownItem } from "flowbite-svelte";

    let depth = 2;
    let board: Board;
    $: board = new Board(depth);
    let currentPlayerString: string;
    $: currentPlayerString = winnerToString(board.sharedGameState.currentPlayer);
</script>

<NavContentLayout>
    <span class="font-semibold relative mb-2 text-nowrap db-accent-line">
        {#if board.getWinner() === Winner.Pending}
            Spieler an der Reihe: {currentPlayerString}
        {:else if board.getWinner() === Winner.Draw}
            Unentschieden 🤯
        {:else}
            {winnerToString(board.getWinner())} hat gewonnen :D 🎉🎉🎉
        {/if}
    </span>
    <div class="flex flex-1 relative justify-center items-stretch aspect-square">
        <BoardView bind:data={board} />
    </div>
    <div slot="settings">
        <DropdownItem>            
            <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiefe {depth}</label>
            <input id="minmax-range" type="range" min="1" max="4" bind:value={depth} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        </DropdownItem>
        <DropdownItem>
            <Button on:click={() => {board = new Board(depth)}} class="w-full">Board resetten</Button>
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
        border-radius: 999vw;
    }
</style>