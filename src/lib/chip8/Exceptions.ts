export class Chip8Exception extends Error {}

// Program parsing
export class InvalidFileSizeException extends Chip8Exception {}
export class InvalidProgramCounterException extends Chip8Exception {}

// Stack
export class StackOverFlowException extends Chip8Exception {}
export class EmptyStackException extends Chip8Exception {}

// Memory
export class MemoryOutOfBoundsException extends Chip8Exception {}

// Keypad
export class InvalidKeyException extends Chip8Exception {}
