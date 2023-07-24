"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
/**
 * Represents a dependency injection container for managing modules, controllers, and handlers.
 */
class Container {
    constructor() {
        this.modules = new Map();
        this.controllers = new Map();
        this.handlers = new Map();
        this.providers = new Map();
    }
    /**
     * Sets an injectable provider in the container.
     * @param providerName The name of the provider.
     * @param provider The provider object to be set.
     */
    setProviders(providerName, provider) {
        this.providers.set(providerName, provider);
    }
    /**
     * Gets the singleton instance of the Container.
     * @returns The singleton instance of the Container.
     */
    static getInstance() {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }
    /**
     * Sets a controller in the container.
     * @param controllerName The name of the controller.
     * @param controller The controller object to be set.
     * @param route The base route for the controller.
     */
    setController(controllerName, controller, route) {
        this.controllers.set(controllerName, {
            route: route,
            controller: controller,
        });
    }
    /**
     * Sets a module in the container.
     * @param moduleName The name of the module.
     * @param module The module object to be set.
     */
    setModule(moduleName, module) {
        this.modules.set(moduleName, module);
    }
    /**
     * Removes a module from the container.
     * @param moduleName The name of the module to be removed.
     */
    removeModule(moduleName) {
        this.modules.delete(moduleName);
    }
    /**
     * Gets a module from the container.
     * @param moduleName The name of the module to retrieve.
     * @returns The module object, if found, or undefined if not present.
     */
    getModule(moduleName) {
        return this.modules.get(moduleName);
    }
    /**
     * Gets the handlers registered for a given key in the container.
     * @param key The key for which handlers are requested.
     * @returns The array of handlers for the given key, if any, or undefined if not present.
     */
    getHandler(key) {
        return this.handlers.get(key);
    }
    /**
     * Sets a handler in the container for the given key.
     * @param handlerName The name of the handler.
     * @param fnc The handler information: route, function, and method.
     */
    setHandler(handlerName, fnc) {
        var _a;
        if (!this.getHandler(handlerName)) {
            this.handlers.set(handlerName, []);
        }
        (_a = this.handlers.get(handlerName)) === null || _a === void 0 ? void 0 : _a.push(fnc);
    }
}
exports.Container = Container;
