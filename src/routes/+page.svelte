<script lang="ts">
    const games = {
        tictactoe: "TicTacToe"
    }
</script>

<div class="bg-[#e69900] p-3 mb-2 rounded-b-xl" style="view-transition-name: navbar">
    <h1 class="text-lg text-center text-white font-bold">
        Coole Games :D
    </h1>
</div>

<ul class="ml-3 max-w-md space-y-1 list-disc list-inside">
    {#each Object.entries(games) as [game, displayName]}
        <li><a href="/{game}" class="text-blue-600 hover:underline" style="view-transition-name: {game};">{displayName}</a></li>
    {/each}
</ul>