export function getPropertyTypes(target: any): { [key: string]: any } {
  const propertyTypes: { [key: string]: any } = {};

  const constructor = target.prototype.constructor;
  const paramNames = constructor
    .toString()
    .match(/\(([^)]*)\)/)![1]
    .split(",")
    .map((param: string) => param.trim());

  return propertyTypes;
}
