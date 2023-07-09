import { Container } from "../containers/mainContainer";

const container = Container.getInstance();

export function Controller(route: string = "") {
  return function (constructor: any) {
    const instance = new constructor(); // Create an instance of the class
    for (const key in instance) {
      if (instance[key] == undefined) {
      }
    }
    container.setController(
      constructor.name,
      instance,
      route[0] == "/" ? route : route == "" ? "" : "/" + route
    );
  };
}
