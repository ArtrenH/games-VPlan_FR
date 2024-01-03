<script lang="ts">
    import { Winner, Board, PlayerField, winnerToString } from "./TicTacToe";

    export let data: Board;
    export let moveCallback: ((fieldNumber: number[]) => void) | null = null;
    if(moveCallback === null) {
        moveCallback = a => {
            data.doMove(a);
            data = data;
        };
    }
</script>

{#if data.getWinner() != Winner.Pending}
    <div class="absolute transition-opacity w-full h-full bg-[#fff8] hover:opacity-0" style="z-index: {data.depth}">
        <svg viewBox="0 0 20 20" class="w-full h-full">
            <text x={data.getWinner() === Winner.X ? "4.9" : "4.5"} y="16" style="fill: #000B;">{winnerToString(data.getWinner())}</text>
        </svg>
    </div>
{/if}
<div class="flex flex-col aspect-square h-full">
    {#if data.fields && data.fields.length === 9}
        {#each {length: 3} as _, row}
            <div class="flex flex-row flex-1">
                {#each {length: 3} as _, col}
                    <div class="flex flex-1 relative justify-center items-stretch border-gray-800 border-[1px]">
                        {#if !(data.fields[0] instanceof PlayerField)}
                            <svelte:self data={data.fields[row*3 + col]} moveCallback={(a) => {moveCallback && moveCallback([row*3 + col, ...a])}} />
                        {:else}
                            {#if data.fields[row*3 + col].getWinner() === Winner.Pending}
                                <button class="flex-1 transition-colors hover:bg-gray-400 disabled:bg-[#48547c]" on:click={() => {moveCallback && moveCallback([row*3 + col])}} disabled={!data.fields[row*3 + col].isEnabled}></button>
                            {:else}
                                <svg viewBox="0 0 20 20" class="flex-1 pointer-events-none">
                                    <text x={data.fields[row*3 + col].getWinner() === Winner.X ? "4.9" : "4.5"} y="16" style="stroke: black; stroke-width: 2;">{winnerToString(data.fields[row*3 + col].getWinner())}</text>
                                </svg>
                            {/if}
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    {:else}
        <span class="font-bold text-red-600">Womp womp :()</span>
    {/if}
</div>
