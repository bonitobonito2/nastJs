import { Module } from "../nast/decorators/module.decorator";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  provider: [AppService],
  controller: [AppController],
  exports: [],
  imports: [],
})
export class AppModule {}
