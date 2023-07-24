import { ControllerInterface } from "../interfaces/controller.interface";
import { ModuleInterface } from "../interfaces/module.interface";

/**
 * Represents a dependency injection container for managing modules, controllers, and handlers.
 */
export class Container {
  private static instance: Container; // Singleton instance
  public modules: Map<string, ModuleInterface>;
  public controllers: Map<string, ControllerInterface>;
  public handlers: Map<
    string,
    Array<{ route: string; fnc: Function; method: string }>
  >;
  public providers: Map<string, object>;

  private constructor() {
    this.modules = new Map<string, ModuleInterface>();
    this.controllers = new Map<string, ControllerInterface>();
    this.handlers = new Map<
      string,
      Array<{ route: string; fnc: Function; method: string }>
    >();
    this.providers = new Map<string, object>();
  }

  /**
   * Sets an injectable provider in the container.
   * @param providerName The name of the provider.
   * @param provider The provider object to be set.
   */
  public setProviders(providerName: string, provider: object) {
    this.providers.set(providerName, provider);
  }

  /**
   * Gets the singleton instance of the Container.
   * @returns The singleton instance of the Container.
   */
  public static getInstance(): Container {
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
  public setController(
    controllerName: string,
    controller: object,
    route: string
  ) {
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
  public setModule(moduleName: string, module: ModuleInterface) {
    this.modules.set(moduleName, module);
  }

  /**
   * Removes a module from the container.
   * @param moduleName The name of the module to be removed.
   */
  public removeModule(moduleName: string) {
    this.modules.delete(moduleName);
  }

  /**
   * Gets a module from the container.
   * @param moduleName The name of the module to retrieve.
   * @returns The module object, if found, or undefined if not present.
   */
  public getModule(moduleName: string): ModuleInterface | undefined {
    return this.modules.get(moduleName);
  }

  /**
   * Gets the handlers registered for a given key in the container.
   * @param key The key for which handlers are requested.
   * @returns The array of handlers for the given key, if any, or undefined if not present.
   */
  public getHandler(key: string) {
    return this.handlers.get(key);
  }

  /**
   * Sets a handler in the container for the given key.
   * @param handlerName The name of the handler.
   * @param fnc The handler information: route, function, and method.
   */
  public setHandler(
    handlerName: string,
    fnc: { route: string; fnc: Function; method: string }
  ) {
    if (!this.getHandler(handlerName)) {
      this.handlers.set(handlerName, []);
    }
    this.handlers.get(handlerName)?.push(fnc);
  }
}
