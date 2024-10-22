<script lang="ts">
    import type { PageData } from './$types';
    import { Chip8 } from '$lib/chip8/Chip8';
    import { AppBar, AppShell } from '@skeletonlabs/skeleton';
    import ProgramCounterDisplay from './ProgramCounterDisplay.svelte';
    import ChipDisplay from './ChipDisplay.svelte';

    export let data: PageData;

    let chip8 = new Chip8();

    const program = data.file;
    chip8.start(program);

    const step = () => {
        chip8.step();
        chip8 = chip8;
    };

    // setInterval(() => {
    //     step();
    // }, 1000);
</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>Skeleton</AppBar>
    </svelte:fragment>
    <svelte:fragment slot="sidebarRight">
        <!-- Hidden below Tailwind's large breakpoint -->
        <div id="sidebar-right" class="w-96 shadow-xl p-4 h-full">
            <ProgramCounterDisplay {chip8} programCounter={chip8.pc} />
        </div>
    </svelte:fragment>

    <div class="p-4">
        <button class="variant-filled-primary" on:click={step}>Step</button>

        <div class="flex flex-row justify-center">
            <ChipDisplay display={chip8.display}></ChipDisplay>
        </div>
    </div>
</AppShell>
