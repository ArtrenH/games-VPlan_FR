<script lang="ts">
    const games = {
        tictactoe: "TicTacToe"
    }
</script>

<h1 class="text-lg text-center text-white font-bold bg-[#e69900] p-3 mb-2 rounded-b-xl white">
    Coole Games :D
</h1>
<ul class="ml-3 max-w-md space-y-1 list-disc list-inside">
    {#each Object.entries(games) as [game, displayName]}
        <li><a href="/{game}" class="text-blue-600 hover:underline" style="view-transition-name: {game};">{displayName}</a></li>
    {/each}
</ul>