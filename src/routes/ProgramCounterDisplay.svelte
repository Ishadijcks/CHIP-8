<script lang="ts">
    import type { Chip8 } from '$lib/chip8/Chip8';

    export let programCounter: number;
    export let chip8: Chip8;

    $: memory = chip8.memory;

    const CONTEXT_WINDOW = 10;
    $: context = memory.getContext(programCounter, CONTEXT_WINDOW);
    $: contextDescription = context.map((i) => chip8.decode(i)?.getDescription() ?? '-');
</script>

<ul class="list">
    {#each context as instruction, index}
        <li
            class="px-2 py-1 {CONTEXT_WINDOW === index
                ? 'variant-filled-secondary'
                : index % 2 === 0
                  ? 'variant-filled-surface'
                  : ''} "
        >
            <span class="w-8">{programCounter - (CONTEXT_WINDOW - index) * 2}</span>
            <span class="flex-auto">{instruction.hex}</span>
            <span class="px-2">{contextDescription[index]}</span>
        </li>
    {/each}
</ul>
