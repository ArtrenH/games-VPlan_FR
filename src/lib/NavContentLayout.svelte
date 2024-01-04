<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="absolute flex justify-between top-0 left-0 right-0 p-1 px-3 rounded-b-xl bg-[#e69900] text-white h-fit" style="view-transition-name: navbar">
    <a style="view-transition-name: {$page.url.pathname.slice(1)};" href="/">Zurück</a>
    <slot name="settings" />
</div>
<div class="mt-7">
    <slot />
</div>