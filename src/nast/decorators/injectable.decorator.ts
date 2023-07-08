import { Container } from "../containers/mainContainer";

const container = Container.getInstance();
export function Injectable(value = undefined) {
  return function (constructor: any) {
    const instance = new constructor();
    container.setProviders(constructor.name, instance);
  };
}
