import { Container } from "../containers/mainContainer";

const container = Container.getInstance();
export function Injectable(value?: string) {
  return function (constructor: any) {
    const instance = new constructor();
    container.setProviders(value ? value : constructor.name, instance);
  };
}
