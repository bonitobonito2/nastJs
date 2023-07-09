import { Injectable } from "../../nast/decorators/injectable.decorator";

@Injectable("userService")
export class UserService {
  public getuser() {
    console.log("getting the user");
  }
}
