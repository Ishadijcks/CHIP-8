<script lang="ts">
    import type { Display } from '$lib/chip8/Display';
    import Pixel from './Pixel.svelte';

    export let display: Display;
</script>

<div class="flex flex-col">
    {#each { length: display.HEIGHT } as _, y}
        <div class="flex flex-row">
            {#each { length: display.WIDTH } as _, x}
                <Pixel value={display.grid[y][x]}></Pixel>
            {/each}
        </div>
    {/each}
</div>
