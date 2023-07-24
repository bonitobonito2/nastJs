"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mainContainer_1 = require("../containers/mainContainer");
const container = mainContainer_1.Container.getInstance();
/**
 * Decorator function to register a route handler for HTTP POST requests in the container.
 * @param value The URL route for the handler (optional). Defaults to "/" if not provided.
 * @returns The decorator function that registers the handler in the container.
 */
function Post(value) {
    return function (target, key, descriptor) {
        container.setHandler(target.constructor.name, {
            route: value ? value : "/",
            fnc: descriptor.value,
            method: "post",
        });
        return descriptor;
    };
}
exports.Post = Post;
