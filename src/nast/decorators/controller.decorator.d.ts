import { Container } from "../containers/mainContainer";

/**
 * Decorator function to register a class as a controller within the container.
 * @param route The base URL route for the controller (optional).
 * @returns The decorator function that registers the controller in the container.
 */
export function Controller(
  route?: string
): (constructor: new () => any) => void;
