import { Module } from "../nast/decorators/module.decorator";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./user/user.module";
import { WierdService } from "./wierd.service";

@Module({
  provider: [AppService, WierdService],
  controller: [AppController],
  exports: [],
  imports: [UsersModule],
})
export class AppModule {}
