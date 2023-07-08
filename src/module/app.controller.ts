import { Controller } from "../nast/decorators/controller.decorator";
import { Get } from "../nast/decorators/get.decorator";
import { Post } from "../nast/decorators/post.decorator";
import { AppService } from "./app.service";
import { NastRequest, NastResponse } from "../nast/types/types";
import { WierdService } from "./wierd.service";

@Controller("")
export class AppController {
  public hello: number = 10;

  constructor(private appService: AppService) {}

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
