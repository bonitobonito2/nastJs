import { Controller } from "../../nast/decorators/controller.decorator";
import { Get } from "../../nast/decorators/get.decorator";
import { NastRequest } from "../../nast/types/types";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/getUser")
  public getUser(req: NastRequest) {
    this.userService.getuser();
    return "done";
  }
}
