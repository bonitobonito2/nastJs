import { Container } from "../containers/mainContainer";
import { ControllerInterface } from "../interfaces/controller.interface";
import chalk from "chalk";
import { ModuleInterface } from "../interfaces/module.interface";
import { Server } from "../server/server";
import { NastRequest, NastResponse } from "../types/types";

const log = console.log;
chalk.level = 1;

/**
 * The factory class for setting up and managing a Nest.js-like application.
 */
export class NastFactory {
  private container: Container;
  private static instance: NastFactory;
  private appModule: any;
  private server: Server;

  /**
   * Creates an instance of NastFactory.
   */
  constructor() {
    this.server = new Server();
    this.container = Container.getInstance();
  }

  /**
   * Creates and returns the singleton instance of NastFactory.
   * @param object The application module object.
   * @returns The singleton instance of NastFactory.
   */
  public static create(object: any): NastFactory {
    if (!NastFactory.instance) {
      NastFactory.instance = new NastFactory();
    }
    NastFactory.instance.appModule = object;
    return NastFactory.instance;
  }

  /**
   * Adds middleware to the server.
   * @param middleware The middleware function to be added.
   */
  public addMiddleware(middleware: Function) {
    this.server.addMiddleware(middleware);
  }

  /**
   * Searches for routes and sets them up for the controllers.
   * @param controllers The array of controller classes.
   */
  private searchRoutesAndSetUp(controllers?: Array<any>) {
    controllers?.forEach((data) => {
      const controllerExists = this.container.controllers.get(data.name);
      if (!controllerExists) {
        throw new Error(
          chalk.red(
            "Is " +
              data.name +
              " a real controller?\nMake sure to use @Controller() decorator"
          )
        );
      }
      const datas = this.container.handlers.get(data.name);

      datas?.forEach((data) => {
        this.server.setRoute(
          controllerExists.route + data.route,
          data.fnc.bind(controllerExists.controller),
          data.method != "get" || "post" ? "get" : data.method
        );
      });
    });
  }

  /**
   * Checks and resolves providers for controllers within a module.
   * @param module The module object.
   */
  private checkProvidersController(module?: ModuleInterface) {
    const controllers = module?.controller;
    controllers?.forEach((controller) => {
      const concreteController: { [key: string]: any } | undefined =
        this.container.controllers.get(controller.name)?.controller;

      for (const key in concreteController) {
        if (concreteController[key] == undefined) {
          const provider = this.container.providers.get(key);
          if (provider == undefined)
            throw new Error(
              chalk.red(
                "Is " +
                  key +
                  " a real provider? Are you sure it is part of the module?"
              )
            );
          concreteController[key] = provider;
        }
      }
    });
  }

  /**
   * Checks and resolves providers for providers (dependency injection).
   */
  private checkProvidersForProviders() {
    this.container.providers.forEach((data: { [key: string]: any }) => {
      for (const key in data) {
        if (data[key] == undefined) {
          const provider = this.container.providers.get(key);

          if (provider == undefined) {
            throw new Error(
              chalk.red(
                "Is " +
                  key +
                  " a real provider? Are you sure it is part of the module?"
              )
            );
          }
          data[key] = provider;
        }
      }
    });
  }

  /**
   * Set up concrete modules recursively.
   * @param moduleName The name of the module to be set up.
   */
  private setUpConcreteModule(moduleName: string) {
    console.log(
      chalk.yellow(
        `\n---------------------------{${moduleName}}------------------------------\n`
      )
    );
    const module = this.container.modules.get(moduleName);
    console.log(chalk.green(`{${moduleName}} dependencies initialized.`));
    this.checkProvidersController(module);
    this.searchRoutesAndSetUp(module?.controller);

    if (module?.imports) {
      module.imports.map((mdl) => {
        this.setUpConcreteModule(mdl.name);
      });
    }
  }

  /**
   * Set up all modules and start listening on the specified port.
   * @param port The port number to listen on.
   */
  public listen(port: number) {
    if (this.container.getModule(this.appModule.name)) {
      console.log(chalk.green("\nSTARTING NAST APPLICATION. "));
      this.checkProvidersForProviders();
      this.setUpConcreteModule(this.appModule.name);
      console.log(chalk.green("\nNest application successfully started"));

      this.server.listen(port);
    }
  }
}
