import { Module } from "../../nast/decorators/module.decorator";
import { PeopleController } from "./people.controller";
import { PeopleService } from "./people.service";

@Module({
  imports: [],
  exports: [],
  provider: [PeopleService],
  controller: [PeopleController],
})
export class PeopleModule {}
