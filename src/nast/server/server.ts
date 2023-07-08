import express, { Express } from "express";
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

  public setRoute(route: string, handler: Function, method: string) {
    if (method == "get") {
      this.server.get(route, (req, res) => {
        handler(req, res);
      });
    }

    if (method == "post") {
      this.server.post(route, (req, res) => {
        handler(req, res);
      });
    }

    console.log(
      `nast container has successfully processed {method:${method} route:${route}} \n`
    );
  }
}
