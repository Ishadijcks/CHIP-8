<script lang="ts">
    import type { Chip8 } from '$lib/chip8/Chip8';

    export let chip8: Chip8;

    $: registers = [chip8.i, chip8.delayTimer, chip8.soundTimer, ...chip8.vRegisters];
</script>

<ul class="list">
    {#each registers as register, index}
        <li class="px-2 py-1 {index % 2 === 0 ? 'variant-filled-surface' : ''}">
            <span class="w-12">{register.name}</span>
            <span class="flex-auto">{'0x' + register.get().toString(16)}</span>
            <span class="flex-auto">{register.get()}</span>
        </li>
    {/each}
</ul>
