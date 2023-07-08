import { Container } from "../containers/mainContainer";

const container = Container.getInstance();

export function Controller(route: string = "") {
  return function (constructor: any) {
    const instance = new constructor(); // Create an instance of the class
    container.setController(constructor.name, instance, route);
  };
}
