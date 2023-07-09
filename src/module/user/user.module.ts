import { Module } from "../../nast/decorators/module.decorator";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [],
  exports: [],
  provider: [UserService],
  controller: [UserController],
})
export class UsersModule {}
