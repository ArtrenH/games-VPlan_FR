<script lang="ts">
    import { page } from "$app/stores";
    import "../app.css";
    import { onNavigate } from '$app/navigation'

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve()
                await navigation.complete
            })
        })
    });
</script>

{#if $page.url.pathname !== "/"}
    <a class="absolute top-1 left-1" style="view-transition-name: {$page.url.pathname.slice(1)};" href="/">Zurück</a>
{/if}
<slot />