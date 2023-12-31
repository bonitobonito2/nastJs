import { Container } from "../containers/mainContainer";

const container = Container.getInstance();

/**
 * Decorator function to register a class as an injectable provider in the container.
 * @param value The name of the provider (optional). Defaults to the class name if not provided.
 * @returns The decorator function that registers the provider in the container.
 */
export function Injectable(value?: string) {
  return function (constructor: new () => any) {
    const instance = new constructor();
    container.setProviders(value ? value : constructor.name, instance);
  };
}
