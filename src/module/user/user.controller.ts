import { Controller } from "../../nast/decorators/controller.decorator";
import { Get } from "../../nast/decorators/get.decorator";
import { NastRequest, NastResponse } from "../../nast/types/types";
import { UsersService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get("/getUser")
  public getUser(req: NastRequest, res: NastResponse) {
    this.usersService.getuser();
    res.send("done");
  }
}
