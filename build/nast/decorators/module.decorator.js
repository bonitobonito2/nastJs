"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const mainContainer_1 = require("../containers/mainContainer");
const container = mainContainer_1.Container.getInstance();
/**
 * Decorator function to register a class as a module in the container.
 * @param data The module data to be registered.
 * @returns The decorator function that registers the module in the container.
 */
function Module(data) {
    return function (constructor) {
        container.setModule(constructor.name, data);
    };
}
exports.Module = Module;
