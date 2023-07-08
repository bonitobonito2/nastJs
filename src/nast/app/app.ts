import { Container } from "../containers/mainContainer";
import { ControllerInterface } from "../interfaces/controller.interface";
import { ModuleInterface } from "../interfaces/module.interface";

import { Server } from "../server/server";
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
    NastFactory.instance.setUpModules();
    return NastFactory.instance;
  }

  private searchRoutesAndSetUp(controllers?: Array<any>) {
    // this.bind();

    controllers?.forEach((data) => {
      // this.bind(data.name);
      const controlerExsists = this.container.controllers.get(data.name);
      if (!controlerExsists) {
        throw Error("is " + data.name + " a real controller?");
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

  private checkProviders(module?: ModuleInterface) {
    const controllers = module?.controller;
    controllers?.forEach((controller) => {
      const concreteController: { [key: string]: any } | undefined =
        this.container.controllers.get(controller.name)?.controller;

      for (const key in concreteController) {
        if (concreteController[key] == undefined) {
          const provider = this.container.providers.get(key);
          if (provider == undefined)
            throw Error(
              "Is " +
                key +
                "a real provider?  are you sure it is part of module?"
            );
          concreteController[key] = this.container.providers.get(key);
          console.log(`{${key}} is valid nastjs provider. \n`);
        }
      }
    });
  }

  private setUpConcreteModule(moduleName: string) {
    const module = this.container.modules.get(moduleName);
    this.checkProviders(module);
    this.searchRoutesAndSetUp(module?.controller);
    if (module?.imports) {
      module.imports.map((mdl) => {
        this.setUpConcreteModule(mdl.name);
        console.log(`{${mdl.name}} has been successfully processed. \n`);
      });
    }
  }
  private setUpModules() {
    this.setUpConcreteModule(this.appModule.name);
  }

  public listen(port: number) {
    if (this.container.getModule(this.appModule.name)) {
      this.server.listen(port);
    }
  }
}
