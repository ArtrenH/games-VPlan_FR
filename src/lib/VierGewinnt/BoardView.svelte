<script lang="ts">
    import { Winner, Board, winnerToString} from "./VierGewinnt";

    export let board: Board;
</script>

{#if board.getWinner() != Winner.Pending}
    Gewonnen hat: {winnerToString(board.getWinner())} !!!
{/if}
<div class="container">
    {#each board.columns as column, index}
    <div class="box">
        <br>
        <button on:click={() => {board.doMove(index); board = board}}>X</button>
        {#each column as field}
        <div class="box2">
            {winnerToString(field)}
        </div>
        {/each}
    </div>
    {/each}
</div>


<style>
    .container {
      display: flex;
    }

    .box {
      width: 100px;
      height: 100px;
      margin: 10px;
      display: flex;
      flex-direction: column;
    }

    .box2 {
      margin: 10px;
      border: 1px solid #000;
    }
</style>