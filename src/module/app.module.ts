import { Module } from "../nast/decorators/module.decorator";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PeopleModule } from "./people/people.module";
import { UsersModule } from "./user/user.module";
import { WierdService } from "./wierd.service";

@Module({
  provider: [AppService],
  controller: [AppController],
  exports: [],
  imports: [UsersModule, PeopleModule],
})
export class AppModule {}
