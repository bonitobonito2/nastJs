"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NastFactory = void 0;
const mainContainer_1 = require("../containers/mainContainer");
const chalk_1 = __importDefault(require("chalk"));
const server_1 = require("../server/server");
const log = console.log;
chalk_1.default.level = 1;
/**
 * The factory class for setting up and managing a Nest.js-like application.
 */
class NastFactory {
    /**
     * Creates an instance of NastFactory.
     */
    constructor() {
        this.server = new server_1.Server();
        this.container = mainContainer_1.Container.getInstance();
    }
    /**
     * Creates and returns the singleton instance of NastFactory.
     * @param object The application module object.
     * @returns The singleton instance of NastFactory.
     */
    static create(object) {
        if (!NastFactory.instance) {
            NastFactory.instance = new NastFactory();
        }
        NastFactory.instance.appModule = object;
        return NastFactory.instance;
    }
    /**
     * Adds middleware to the server.
     * @param middleware The middleware function to be added.
     */
    addMiddleware(middleware) {
        this.server.addMiddleware(middleware);
    }
    /**
     * Searches for routes and sets them up for the controllers.
     * @param controllers The array of controller classes.
     */
    searchRoutesAndSetUp(controllers) {
        controllers === null || controllers === void 0 ? void 0 : controllers.forEach((data) => {
            const controllerExists = this.container.controllers.get(data.name);
            if (!controllerExists) {
                throw new Error(chalk_1.default.red("Is " +
                    data.name +
                    " a real controller?\nMake sure to use @Controller() decorator"));
            }
            const datas = this.container.handlers.get(data.name);
            datas === null || datas === void 0 ? void 0 : datas.forEach((data) => {
                this.server.setRoute(controllerExists.route + data.route, data.fnc.bind(controllerExists.controller), data.method != "get" || "post" ? "get" : data.method);
            });
        });
    }
    /**
     * Checks and resolves providers for controllers within a module.
     * @param module The module object.
     */
    checkProvidersController(module) {
        const controllers = module === null || module === void 0 ? void 0 : module.controller;
        controllers === null || controllers === void 0 ? void 0 : controllers.forEach((controller) => {
            var _a;
            const concreteController = (_a = this.container.controllers.get(controller.name)) === null || _a === void 0 ? void 0 : _a.controller;
            for (const key in concreteController) {
                if (concreteController[key] == undefined) {
                    const provider = this.container.providers.get(key);
                    if (provider == undefined)
                        throw new Error(chalk_1.default.red("Is " +
                            key +
                            " a real provider? Are you sure it is part of the module?"));
                    concreteController[key] = provider;
                }
            }
        });
    }
    /**
     * Checks and resolves providers for providers (dependency injection).
     */
    checkProvidersForProviders() {
        this.container.providers.forEach((data) => {
            for (const key in data) {
                if (data[key] == undefined) {
                    const provider = this.container.providers.get(key);
                    if (provider == undefined) {
                        throw new Error(chalk_1.default.red("Is " +
                            key +
                            " a real provider? Are you sure it is part of the module?"));
                    }
                    data[key] = provider;
                }
            }
        });
    }
    /**
     * Set up concrete modules recursively.
     * @param moduleName The name of the module to be set up.
     */
    setUpConcreteModule(moduleName) {
        console.log(chalk_1.default.yellow(`\n---------------------------{${moduleName}}------------------------------\n`));
        const module = this.container.modules.get(moduleName);
        console.log(chalk_1.default.green(`{${moduleName}} dependencies initialized.`));
        this.checkProvidersController(module);
        this.searchRoutesAndSetUp(module === null || module === void 0 ? void 0 : module.controller);
        if (module === null || module === void 0 ? void 0 : module.imports) {
            module.imports.map((mdl) => {
                this.setUpConcreteModule(mdl.name);
            });
        }
    }
    /**
     * Set up all modules and start listening on the specified port.
     * @param port The port number to listen on.
     */
    listen(port) {
        if (this.container.getModule(this.appModule.name)) {
            console.log(chalk_1.default.green("\nSTARTING NAST APPLICATION. "));
            this.checkProvidersForProviders();
            this.setUpConcreteModule(this.appModule.name);
            console.log(chalk_1.default.green("\nNest application successfully started"));
            this.server.listen(port);
        }
    }
}
exports.NastFactory = NastFactory;
