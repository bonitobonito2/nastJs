import { Controller } from "../../nast/decorators/controller.decorator";
import { Get } from "../../nast/decorators/get.decorator";
import { NastRequest, NastResponse } from "../../nast/types/types";
import { PeopleService } from "./people.service";

@Controller("/people")
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get("/getPeople")
  public getPeople(req: NastRequest, res: NastResponse) {
    this.peopleService.getPeople();
    res.send("done");
  }
}
