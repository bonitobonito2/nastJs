import express, { Express, Request, Response, NextFunction } from "express";
import chalk from "chalk";
chalk.level = 1;
import bodyParser from "body-parser";

/**
 * Interface for route handler functions.
 * @param req The Express Request object.
 * @returns A Promise that resolves to the response data.
 */
interface RouteHandler {
  (req: Request): Promise<any>;
}

/**
 * Represents an Express server with additional features.
 */
export class Server {
  private server: Express;

  /**
   * Creates an instance of Server.
   */
  constructor() {
    this.server = express();
    this.server.use(bodyParser.json());
  }

  /**
   * Starts the Express server on the specified port.
   * @param port The port number to listen on.
   */
  public listen(port: number) {
    this.server.listen(port);
  }

  /**
   * Adds middleware to the Express server.
   * @param handler The middleware handler function.
   */
  public addMiddleware(
    handler: (req: Request, res: Response, next: NextFunction) => void
  ) {
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
  public setRoute(
    route: string,
    handler: RouteHandler,
    method: "get" | "post"
  ) {
    if (method === "get") {
      this.server.get(route, async (req, res) => {
        const result = JSON.stringify(await handler(req));
        res.send(result);
      });
    }

    if (method === "post") {
      this.server.post(route, async (req, res) => {
        const result = JSON.stringify(await handler(req));
        res.send(result);
      });
    }

    console.log(
      chalk.green(
        `Successfully processed {method:${method}, route:{${route}}}.`
      )
    );
  }
}
