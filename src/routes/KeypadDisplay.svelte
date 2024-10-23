<script lang="ts">
    import type { Chip8 } from '$lib/chip8/Chip8';

    export let chip8: Chip8;

    const pressButton = (i: number) => {
        chip8.keypad.press(i);
    };

    const releaseButton = (i: number) => {
        chip8.keypad.release(i);
    };

    const buttonOrder = [0x1, 0x2, 0x3, 0xc, 0x4, 0x5, 0x6, 0xd, 0x7, 0x8, 0x9, 0xe, 0xa, 0x0, 0xb, 0xf];
</script>

<div class="grid grid-cols-4 gap-1">
    {#each buttonOrder as button}
        <button
            class="w-8 h-8 variant-filled-primary"
            on:mousedown={() => {
                pressButton(button);
            }}
            on:mouseup={() => {
                releaseButton(button);
            }}
            >{button.toString(16).toLocaleUpperCase()}
        </button>
    {/each}
</div>
