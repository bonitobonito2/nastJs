"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
const mainContainer_1 = require("../containers/mainContainer");
const container = mainContainer_1.Container.getInstance();
/**
 * Decorator function to register a class as an injectable provider in the container.
 * @param value The name of the provider (optional). Defaults to the class name if not provided.
 * @returns The decorator function that registers the provider in the container.
 */
function Injectable(value) {
    return function (constructor) {
        const instance = new constructor();
        container.setProviders(value ? value : constructor.name, instance);
    };
}
exports.Injectable = Injectable;
