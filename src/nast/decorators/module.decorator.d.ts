import { ModuleInterface } from "../interfaces/module.interface";
/**
 * Decorator function to register a class as a module in the container.
 * @param data The module data to be registered.
 * @returns The decorator function that registers the module in the container.
 */
export declare function Module(data: ModuleInterface): (constructor: new () => any) => void;
