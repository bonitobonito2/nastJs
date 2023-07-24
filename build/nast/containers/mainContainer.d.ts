import { ControllerInterface } from "../interfaces/controller.interface";
import { ModuleInterface } from "../interfaces/module.interface";
/**
 * Represents a dependency injection container for managing modules, controllers, and handlers.
 */
export declare class Container {
    private static instance;
    modules: Map<string, ModuleInterface>;
    controllers: Map<string, ControllerInterface>;
    handlers: Map<string, Array<{
        route: string;
        fnc: Function;
        method: string;
    }>>;
    providers: Map<string, object>;
    private constructor();
    /**
     * Sets an injectable provider in the container.
     * @param providerName The name of the provider.
     * @param provider The provider object to be set.
     */
    setProviders(providerName: string, provider: object): void;
    /**
     * Gets the singleton instance of the Container.
     * @returns The singleton instance of the Container.
     */
    static getInstance(): Container;
    /**
     * Sets a controller in the container.
     * @param controllerName The name of the controller.
     * @param controller The controller object to be set.
     * @param route The base route for the controller.
     */
    setController(controllerName: string, controller: object, route: string): void;
    /**
     * Sets a module in the container.
     * @param moduleName The name of the module.
     * @param module The module object to be set.
     */
    setModule(moduleName: string, module: ModuleInterface): void;
    /**
     * Removes a module from the container.
     * @param moduleName The name of the module to be removed.
     */
    removeModule(moduleName: string): void;
    /**
     * Gets a module from the container.
     * @param moduleName The name of the module to retrieve.
     * @returns The module object, if found, or undefined if not present.
     */
    getModule(moduleName: string): ModuleInterface | undefined;
    /**
     * Gets the handlers registered for a given key in the container.
     * @param key The key for which handlers are requested.
     * @returns The array of handlers for the given key, if any, or undefined if not present.
     */
    getHandler(key: string): {
        route: string;
        fnc: Function;
        method: string;
    }[];
    /**
     * Sets a handler in the container for the given key.
     * @param handlerName The name of the handler.
     * @param fnc The handler information: route, function, and method.
     */
    setHandler(handlerName: string, fnc: {
        route: string;
        fnc: Function;
        method: string;
    }): void;
}
