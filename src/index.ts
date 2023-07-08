import { AppModule } from "./module/app.module";
import { NastFactory } from "./nast/app/app";

function Bootsrap() {
  const app = NastFactory.craete(AppModule);
  app.listen(3000);
}

Bootsrap();
