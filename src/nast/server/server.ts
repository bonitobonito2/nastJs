import express, { Express } from "express";
import chalk from "chalk";
chalk.level = 1;
import bodyParser from "body-parser";
export class Server {
  private server: Express;

  constructor() {
    this.server = express();
    this.server.use(bodyParser.json());
  }

  public listen(port: number) {
    this.server.listen(port);
  }

  public addMiddleware(handler: Function) {
    this.server.use((req, res, next) => {
      handler(req, res, next);
    });
  }

  public setRoute(route: string, handler: Function, method: string) {
    if (method == "get") {
      this.server.get(route, (req, res) => {
        res.send(handler(req));
      });
    }

    if (method == "post") {
      this.server.post(route, (req, res) => {
        res.send(handler(req));
      });
    }

    console.log(
      chalk.green(`Successfully processed {method:${method}, route:${route}}.`)
    );
  }
}
