import { Injectable } from "../nast/decorators/injectable.decorator";
import { AppService } from "./app.service";

@Injectable("wierdService")
export class WierdService {
  constructor(private readonly appService: AppService) {}
  public wierdService() {
    this.appService.test();
    console.log("i am wierd service");
  }
}
