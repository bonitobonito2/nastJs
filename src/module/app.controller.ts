import { Controller } from "../nast/decorators/controller.decorator";
import { Get } from "../nast/decorators/get.decorator";
import { Post } from "../nast/decorators/post.decorator";
import { AppService } from "./app.service";
import { Inject } from "../nast/decorators/inject.decorator";
import { NastRequest, NastResponse } from "../nast/types/types";

@Controller("/app")
export class AppController {
  public hello: number = 10;

  @Inject("AppService")
  private appService: AppService;
  constructor() {}

  @Get("/kargi")
  hola(req: NastRequest, res: NastResponse) {
    console.log(this.hello);

    res.send("esec ase");
  }

  @Post("/lamazi")
  magaria(req: NastRequest, res: NastResponse) {
    console.log(this.appService);
    this.appService.smh();
    res.json({ hola: true, hello: this.hello });
  }
}
