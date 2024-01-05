<script lang="ts">
    import { Winner, Board, winnerToString} from "./VierGewinnt";

    export let board: Board;
</script>

<div class="flex flex-row gap-1 w-full bg-[#48547c] p-1 rounded-md">
    {#each board.columns as column, index}
      <div class="flex flex-col gap-1 flex-1">
          <button on:click={() => {board.doMove(index); board = board}} disabled={board.getWinner() != Winner.Pending} class="aspect-square flex justify-center items-center">
            <svg class="w-7 h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
            </svg>
          </button>
          {#each column as field}
          <div class="flex-1 justify-center items-center">
            <div class="aspect-square rounded-full bg-white" class:red={field === Winner.Red} class:yellow={field === Winner.Yellow}></div>
          </div>
          {/each}
      </div>
    {/each}
</div>

<style>
    .red {
        background: #e60000;
    }
    
    .yellow {
        background: #e6d700;
    }
</style>