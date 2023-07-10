import { Controller } from "../nast/decorators/controller.decorator";
import { Get } from "../nast/decorators/get.decorator";
import { Post } from "../nast/decorators/post.decorator";
import { AppService } from "./app.service";
import { NastRequest } from "../nast/types/types";
import { WierdService } from "./wierd.service";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/kargi")
  hola(req: NastRequest) {
    return { suc: true };
  }

  @Post("/checklife")
  magaria(req: NastRequest) {
    this.appService.smh();
    return { hola: true };
  }

  @Get()
  getNothing(req: NastRequest) {
    return { nothing: true };
  }
}
