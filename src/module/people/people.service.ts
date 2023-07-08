import { Injectable } from "../../nast/decorators/injectable.decorator";

@Injectable("peopleService")
export class PeopleService {
  public getPeople() {
    console.log("getting the user");
  }
}
