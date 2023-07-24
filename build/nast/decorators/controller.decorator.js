"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const mainContainer_1 = require("../containers/mainContainer");
const container = mainContainer_1.Container.getInstance();
/**
 * Decorator function to register a class as a controller within the container.
 * @param route The base URL route for the controller (optional).
 * @returns The decorator function that registers the controller in the container.
 */
function Controller(route = "") {
    return function (constructor) {
        const instance = new constructor(); // Create an instance of the class
        for (const key in instance) {
            if (instance[key] == undefined) {
                // Add any specific logic here if needed
            }
        }
        // Register the controller in the container
        container.setController(constructor.name, instance, route[0] === "/" ? route : route === "" ? "" : "/" + route);
    };
}
exports.Controller = Controller;
