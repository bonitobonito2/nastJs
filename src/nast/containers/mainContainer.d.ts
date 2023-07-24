import { ControllerInterface } from "../interfaces/controller.interface";
import { ModuleInterface } from "../interfaces/module.interface";

/**
 * Represents a dependency injection container for managing modules, controllers, and handlers.
 */
export declare class Container {
  private static instance: Container;
  public modules: Map<string, ModuleInterface>;
  public controllers: Map<string, ControllerInterface>;
  public handlers: Map<
    string,
    Array<{ route: string; fnc: Function; method: string }>
  >;
  public providers: Map<string, object>;

  private constructor();

  public setProviders(providerName: string, provider: object): void;

  public static getInstance(): Container;

  public setController(
    controllerName: string,
    controller: object,
    route: string
  ): void;

  public setModule(moduleName: string, module: ModuleInterface): void;

  public removeModule(moduleName: string): void;

  public getModule(moduleName: string): ModuleInterface | undefined;

  public getHandler(
    key: string
  ): Array<{ route: string; fnc: Function; method: string }> | undefined;

  public setHandler(
    handlerName: string,
    fnc: { route: string; fnc: Function; method: string }
  ): void;
}
