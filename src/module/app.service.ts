import { Injectable } from "../nast/decorators/injectable.decorator";

@Injectable("appService")
export class AppService {
  public smh() {
    console.log("smh");
    console.log("wtf>?");
  }
}
