<script lang="ts">
    import type { PageData } from './$types';
    import { Chip8 } from '$lib/chip8/Chip8';
    import { AppBar, AppShell } from '@skeletonlabs/skeleton';
    import ProgramCounterDisplay from './ProgramCounterDisplay.svelte';
    import ChipDisplay from './ChipDisplay.svelte';
    import RegisterDisplay from './RegisterDisplay.svelte';

    export let data: PageData;

    let chip8 = new Chip8();

    console.log(data);
    $: programs = data.programs;

    let selectedProgram: string;
    const start = (e) => {
        console.log(`Starting ${e.target.value}`);
        chip8.start(programs[e.target.value]);
        chip8 = chip8;
    };

    const step = () => {
        chip8.step();
        chip8 = chip8;
    };
</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>CHIP-8</AppBar>
    </svelte:fragment>
    <svelte:fragment slot="sidebarRight">
        <!-- Hidden below Tailwind's large breakpoint -->
        <div id="sidebar-right" class="shadow-xl p-4 h-full">
            <div class="flex flex-row space-x-8">
                <RegisterDisplay {chip8} />

                <ProgramCounterDisplay {chip8} programCounter={chip8.pc} />
            </div>
        </div>
    </svelte:fragment>

    <div class="p-4">
        <div class="flex flex-col">
            <button class="btn variant-filled-primary" on:click={step}>Step</button>

            <select class="select" value={selectedProgram} on:change={(e) => start(e)}>
                {#each Object.keys(programs) as key}
                    <option value={key}>
                        {key}
                    </option>
                {/each}
            </select>
        </div>

        <div class="flex flex-row justify-center">
            <ChipDisplay display={chip8.display}></ChipDisplay>
        </div>
    </div>
</AppShell>
