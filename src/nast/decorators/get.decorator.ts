import { Container } from "../containers/mainContainer";

const container = Container.getInstance();

/**
 * Decorator function to register a route handler for HTTP GET requests in the container.
 * @param value The URL route for the handler (optional). Defaults to "/" if not provided.
 * @returns The decorator function that registers the handler in the container.
 */
export function Get(value?: string) {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    container.setHandler(target.constructor.name, {
      route: value ? value : "/",
      fnc: descriptor.value,
      method: "get",
    });
    return descriptor;
  };
}
