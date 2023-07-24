import { Express, Request, Response, NextFunction } from "express";

/**
 * Interface for route handler functions.
 * @param req The Express Request object.
 * @returns A Promise that resolves to the response data.
 */
declare interface RouteHandler {
  (req: Request): Promise<any>;
}

/**
 * Represents an Express server with additional features.
 */
declare class Server {
  /**
   * Creates an instance of Server.
   */
  constructor();

  /**
   * Starts the Express server on the specified port.
   * @param port The port number to listen on.
   */
  listen(port: number): void;

  /**
   * Adds middleware to the Express server.
   * @param handler The middleware handler function.
   */
  addMiddleware(
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): void;

  /**
   * Sets up a route on the Express server.
   * @param route The URL route to handle.
   * @param handler The route handler function.
   * @param method The HTTP method for the route ("get" or "post").
   */
  setRoute(route: string, handler: RouteHandler, method: "get" | "post"): void;
}

export = Server;
