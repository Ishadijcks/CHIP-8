<script lang="ts">
    import type { Memory } from '$lib/chip8/Memory';

    export let programCounter: number;

    export let memory: Memory;

    const CONTEXT_WINDOW = 10;
    $: context = memory.getContext(programCounter, CONTEXT_WINDOW);
</script>

<ul class="list">
    {#each context as instruction, index}
        <li>
            <span>{programCounter - (CONTEXT_WINDOW - index) * 2}</span>
            {#if programCounter - (CONTEXT_WINDOW - index) * 2 === programCounter}
                <span> -> </span>
            {:else}
                <span> </span>
            {/if}
            <span class="flex-auto">{instruction.hex}</span>
        </li>
    {/each}
</ul>
