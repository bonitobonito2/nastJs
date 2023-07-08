import { Injectable } from "../nast/decorators/injectable.decorator";

// @Injectable("wierdService")
export class WierdService {
  public wierdService() {
    console.log("i am wierd service");
  }
}
