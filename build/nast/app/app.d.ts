/**
 * The factory class for setting up and managing a Nest.js-like application.
 */
export declare class NastFactory {
    private container;
    private static instance;
    private appModule;
    private server;
    /**
     * Creates an instance of NastFactory.
     */
    constructor();
    /**
     * Creates and returns the singleton instance of NastFactory.
     * @param object The application module object.
     * @returns The singleton instance of NastFactory.
     */
    static create(object: any): NastFactory;
    /**
     * Adds middleware to the server.
     * @param middleware The middleware function to be added.
     */
    addMiddleware(middleware: Function): void;
    /**
     * Searches for routes and sets them up for the controllers.
     * @param controllers The array of controller classes.
     */
    private searchRoutesAndSetUp;
    /**
     * Checks and resolves providers for controllers within a module.
     * @param module The module object.
     */
    private checkProvidersController;
    /**
     * Checks and resolves providers for providers (dependency injection).
     */
    private checkProvidersForProviders;
    /**
     * Set up concrete modules recursively.
     * @param moduleName The name of the module to be set up.
     */
    private setUpConcreteModule;
    /**
     * Set up all modules and start listening on the specified port.
     * @param port The port number to listen on.
     */
    listen(port: number): void;
}
