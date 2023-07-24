import { Container } from "../containers/mainContainer";

const container = Container.getInstance();

/**
 * Decorator function to register a class as a controller within the container.
 * @param route The base URL route for the controller (optional).
 * @returns The decorator function that registers the controller in the container.
 */
export function Controller(route: string = "") {
  return function (constructor: new () => any) {
    const instance = new constructor(); // Create an instance of the class
    for (const key in instance) {
      if (instance[key] == undefined) {
        // Add any specific logic here if needed
      }
    }

    // Register the controller in the container
    container.setController(
      constructor.name,
      instance,
      route[0] === "/" ? route : route === "" ? "" : "/" + route
    );
  };
}
