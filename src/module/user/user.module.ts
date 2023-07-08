import { Module } from "../../nast/decorators/module.decorator";
import { UserController } from "./user.controller";
import { UsersService } from "./user.service";

@Module({
  imports: [],
  exports: [],
  provider: [UsersService],
  controller: [UserController],
})
export class UsersModule {}
