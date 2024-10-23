<script lang="ts">
    import type { PageData } from './$types';
    import { Chip8 } from '$lib/chip8/Chip8';
    import { AppBar, AppShell } from '@skeletonlabs/skeleton';
    import ProgramCounterDisplay from './ProgramCounterDisplay.svelte';
    import ChipDisplay from './ChipDisplay.svelte';
    import RegisterDisplay from './RegisterDisplay.svelte';
    import KeypadDisplay from './KeypadDisplay.svelte';

    export let data: PageData;

    let chip8 = new Chip8();

    console.log(data);
    $: programs = data.programs;

    let selectedProgram: string;
    const start = (e) => {
        console.log(`Starting ${e.target.value}`);
        chip8.start(programs[e.target.value]);
        chip8 = chip8;
        resume();
    };

    let interval: ReturnType<typeof setInterval>;
    let hz: number = 10;
    const updateInterval = (e) => {
        clearInterval(interval);
        interval = setInterval(() => step(), 1000.0 / e.target.value);
    };

    const pause = () => {
        clearInterval(interval);
    };

    const resume = () => {
        interval = setInterval(() => step(), 1000.0 / hz);
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
                <div class="w-48">
                    <RegisterDisplay {chip8} />
                </div>
                <div class="w-96">
                    <ProgramCounterDisplay {chip8} programCounter={chip8.pc} />
                </div>
            </div>
        </div>
    </svelte:fragment>

    <div class="p-4">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <span>{hz} Hz</span>
                <input bind:value={hz} on:input={updateInterval} type="range" min="1" max="1000" />
            </div>

            <div class="flex flex-row p-2 space-x-8 justify-center">
                <button class="btn variant-filled-secondary" on:click={step}>Step</button>
                <button class="btn variant-filled-success" on:click={resume}>Resume</button>
                <button class="btn variant-filled-error" on:click={pause}>Pause</button>

                <select class="select" value={selectedProgram} on:change={(e) => start(e)}>
                    {#each Object.keys(programs) as key}
                        <option value={key}>
                            {key}
                        </option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="flex flex-col space-y-12 p-4 items-center">
            <ChipDisplay display={chip8.display}></ChipDisplay>
            <KeypadDisplay {chip8}></KeypadDisplay>
        </div>
    </div>
</AppShell>
