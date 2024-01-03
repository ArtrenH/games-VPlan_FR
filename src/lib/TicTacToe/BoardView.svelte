<script lang="ts">
    import { Winner, Board, PlayerField } from "./TicTacToe";

    function mapWinner(value: Winner): string {
        switch(value) {
            case Winner.X:
                return "X";
            case Winner.O:
                return "O";
            case Winner.Draw:
                return "Draw";
            case Winner.Pending:
                return "P";
            default:
                const _exhaustiveCheck: never = value;
                return _exhaustiveCheck;
        }
    }

    export let data: Board;
</script>

<div class="flex flex-col justify-evenly border-black border-2 rounded-md w-full aspect-square">
    {#if data.fields && data.fields.length === 9}
        {#each {length: 3} as _, row}
            <div class="flex flex-row justify-evenly">
                {#each {length: 3} as _, col}
                    <div class="flex flex-1">
                        <span class="">{mapWinner(data.fields[row*3 + col].getWinner())}</span>
                        {#if !(data.fields[0] instanceof PlayerField)}
                            <svelte:self data={data.fields[0]} />
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    {:else}
        <span class="font-bold text-red-600">Womp womp :(</span>
    {/if}
</div>