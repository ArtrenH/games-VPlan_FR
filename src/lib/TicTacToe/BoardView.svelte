<script lang="ts">
    import { Winner, Board, PlayerField, winnerToString } from "./TicTacToe";

    export let data: Board;
    export let moveCallback: ((fieldNumber: number[]) => void) | null = null;
    if(moveCallback === null) {
        moveCallback = a => {
            console.log(a);
            console.log(data);
            data.doMove(a);
            data = data;
            console.log(data);
        };
    }
</script>

<div class="flex flex-col aspect-square h-full">
    {#if data.fields && data.fields.length === 9}
        {#each {length: 3} as _, row}
            <div class="flex flex-row flex-1">
                {#each {length: 3} as _, col}
                    <div class="flex flex-1 justify-center items-stretch border-gray-800 border-[1px]">
                        <!--<span class="">{winnerToString(data.fields[row*3 + col].getWinner())}</span>-->
                        {#if !(data.fields[0] instanceof PlayerField)}
                            <svelte:self data={data.fields[row*3 + col]} moveCallback={(a) => {moveCallback && moveCallback([row*3 + col, ...a])}} />
                        {:else}
                            {#if data.fields[row*3 + col].getWinner() === Winner.Pending}
                                <button class="flex-1 hover:bg-gray-300 disabled:bg-gray-500" on:click={() => {moveCallback && moveCallback([row*3 + col])}} disabled={!data.fields[row*3 + col].isEnabled}></button>
                            {:else}
                                <svg viewBox="0 0 20 20" class="flex-1 pointer-events-none">
                                    <text x={data.fields[row*3 + col].getWinner() === Winner.X ? "5.3" : "3.7"} y="16" style="stroke: black; stroke-width: 2;">{winnerToString(data.fields[row*3 + col].getWinner())}</text>
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
