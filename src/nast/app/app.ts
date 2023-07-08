import { Container } from "../containers/mainContainer";
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
    NastFactory.instance.setupRoutes();
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
    const providers = module?.provider;

    const controllers = module?.controller;
    controllers?.forEach((controller) => {
      const concreteControlelr = this.container.controllers.get(
        controller.name
      )?.controller;
      providers?.forEach((data) => {
        const prvd = this.container.providers.get(data.name);
        console.log(prvd, concreteControlelr);
      });
    });
    // console.log(controllers);
  }

  private setupRoutes() {
    const module = this.container.modules.get(this.appModule.name);
    this.checkProviders(module);
    this.searchRoutesAndSetUp(module?.controller);
  }

  public listen(port: number) {
    if (this.container.getModule(this.appModule.name)) {
      this.server.listen(port);
    }
  }
}
