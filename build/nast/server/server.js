"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
chalk_1.default.level = 1;
const body_parser_1 = __importDefault(require("body-parser"));
/**
 * Represents an Express server with additional features.
 */
class Server {
    /**
     * Creates an instance of Server.
     */
    constructor() {
        this.server = (0, express_1.default)();
        this.server.use(body_parser_1.default.json());
    }
    /**
     * Starts the Express server on the specified port.
     * @param port The port number to listen on.
     */
    listen(port) {
        this.server.listen(port);
    }
    /**
     * Adds middleware to the Express server.
     * @param handler The middleware handler function.
     */
    addMiddleware(handler) {
        this.server.use((req, res, next) => {
            handler(req, res, next);
        });
    }
    /**
     * Sets up a route on the Express server.
     * @param route The URL route to handle.
     * @param handler The route handler function.
     * @param method The HTTP method for the route ("get" or "post").
     */
    setRoute(route, handler, method) {
        if (method === "get") {
            this.server.get(route, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = JSON.stringify(yield handler(req));
                res.send(result);
            }));
        }
        if (method === "post") {
            this.server.post(route, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = JSON.stringify(yield handler(req));
                res.send(result);
            }));
        }
        console.log(chalk_1.default.green(`Successfully processed {method:${method}, route:{${route}}}.`));
    }
}
exports.Server = Server;
