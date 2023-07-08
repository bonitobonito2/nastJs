import { ModuleInterface } from "../interfaces/module.interface";
import { Container } from "../containers/mainContainer";

const container = Container.getInstance();

export function Module(data: ModuleInterface) {
  return function (constructor: any) {
    container.setModule(constructor.name, data);
  };
}
