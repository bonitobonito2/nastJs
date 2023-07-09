import { Injectable } from "../nast/decorators/injectable.decorator";
import { WierdService } from "./wierd.service";

@Injectable("appService")
export class AppService {
  constructor(private readonly wierdService: WierdService) {}
  public smh() {
    console.log("smh");
    this.wierdService.wierdService();
    console.log("wtf>?");
  }

  public test() {
    console.log("test completed");
  }
}
