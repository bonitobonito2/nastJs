import { Injectable } from "../../nast/decorators/injectable.decorator";

@Injectable("usersService")
export class UsersService {
  public getuser() {
    console.log("getting the user");
  }
}
