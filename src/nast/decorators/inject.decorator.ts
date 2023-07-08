import { AppService } from "../../module/app.service";

export function Inject(newValue: string) {
  return (target: any, key: string): void => {
    const privateFieldName = `_${key}`;

    Reflect.defineProperty(target, key, {
      get: function () {
        return this[privateFieldName];
      },
      set: function (value: AppService) {
        this[privateFieldName] = new AppService();
      },
      enumerable: true,
      configurable: true,
    });
  };
}
