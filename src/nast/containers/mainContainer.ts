import { ControllerInterface } from "../interfaces/controller.interface";
import { ModuleInterface } from "../interfaces/module.interface";

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

  public setProviders(providerName: string, provider: object) {
    this.providers.set(providerName, provider);
  }
  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

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
  public setModule(moduleName: string, module: ModuleInterface) {
    this.modules.set(moduleName, module);
  }

  public removeModule(moduleName: string) {
    this.modules.delete(moduleName);
  }

  public getModule(moduleName: string): ModuleInterface | undefined {
    return this.modules.get(moduleName);
  }

  public getHandler(key: string) {
    return this.handlers.get(key);
  }
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
