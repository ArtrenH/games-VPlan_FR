<script lang="ts">
    import { page } from "$app/stores";
    import "../app.css";
</script>

{#if $page.url.pathname !== "/"}
    <a class="absolute top-1 left-1" href="/">Go back</a>
{/if}
<slot />