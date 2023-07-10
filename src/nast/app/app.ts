import { Container } from "../containers/mainContainer";
import { ControllerInterface } from "../interfaces/controller.interface";
import chalk from "chalk";
import { ModuleInterface } from "../interfaces/module.interface";

import { Server } from "../server/server";

const log = console.log;
chalk.level = 1;

export class NastFactory {
  private container: Container;
  private static instance: NastFactory;
  private appModule: any;
  private server: Server;
  constructor() {
    this.server = new Server();
    this.container = Container.getInstance();
  }
  public static craete(object: any) {
    if (!NastFactory.instance) {
      NastFactory.instance = new NastFactory();
    }
    NastFactory.instance.appModule = object;
    return NastFactory.instance;
  }

  public addMiddleware(middleware: Function) {
    this.server.addMiddleware(middleware);
  }
  private searchRoutesAndSetUp(controllers?: Array<any>) {
    controllers?.forEach((data) => {
      const controlerExsists = this.container.controllers.get(data.name);
      if (!controlerExsists) {
        throw Error(
          chalk.red(
            "is " +
              data.name +
              " a real controller?\nMake sure to use @Controller() decorator"
          )
        );
      }
      const datas = this.container.handlers.get(data.name);

      datas?.forEach((data) => {
        this.server.setRoute(
          controlerExsists.route + data.route,
          data.fnc.bind(controlerExsists.controller),
          data.method
        );
      });
    });
  }

  private checkProvidersController(module?: ModuleInterface) {
    const controllers = module?.controller;
    controllers?.forEach((controller) => {
      const concreteController: { [key: string]: any } | undefined =
        this.container.controllers.get(controller.name)?.controller;

      for (const key in concreteController) {
        if (concreteController[key] == undefined) {
          const provider = this.container.providers.get(key);
          if (provider == undefined)
            throw Error(
              chalk.red(
                "Is " +
                  key +
                  "a real provider?  are you sure it is part of module?"
              )
            );
          concreteController[key] = provider;
        }
      }
    });
  }

  private checkProvidersForProviders() {
    this.container.providers.forEach((data: { [key: string]: any }) => {
      for (const key in data) {
        if (data[key] == undefined) {
          const provider = this.container.providers.get(key);

          if (provider == undefined) {
            throw Error(
              chalk.red(
                "Is " +
                  key +
                  "a real provider?  are you sure it is part of module?"
              )
            );
          }
          data[key] = provider;
        }
      }
    });
  }

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
  private setUpModules() {
    this.checkProvidersForProviders();

    this.setUpConcreteModule(this.appModule.name);
  }

  public listen(port: number) {
    if (this.container.getModule(this.appModule.name)) {
      console.log(chalk.green("\nSTARTING NAST APPLICATION. "));
      this.setUpModules();
      console.log(chalk.green("\nNest application successfully started"));

      this.server.listen(port);
    }
  }
}
