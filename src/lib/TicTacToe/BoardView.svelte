<script lang="ts">
    import { Board } from "./TicTacToe";

    export let data: Board;
</script>

<div class="">
    {#each {length: 3} as _, row}
        {#each {length: 3} as _, col}
            {data.fields[row*3 + col].getWinner()}
        {/each}
    {/each}
</div>