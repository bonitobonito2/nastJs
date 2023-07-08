import { Container } from "../containers/mainContainer";

const container = Container.getInstance();

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
