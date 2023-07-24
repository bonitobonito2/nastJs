/**
 * Decorator function to register a class as an injectable provider in the container.
 * @param value The name of the provider (optional). Defaults to the class name if not provided.
 * @returns The decorator function that registers the provider in the container.
 */
export declare function Injectable(value?: string): (constructor: new () => any) => void;
