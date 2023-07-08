import { Injectable } from "../nast/decorators/injectable.decorator";

@Injectable()
export class AppService {
  public smh() {
    console.log("smh");
    console.log("wtf>?");
  }
}
