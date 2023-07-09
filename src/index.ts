import { NextFunction } from "express";
import { AppModule } from "./module/app.module";
import { NastFactory } from "./nast/app/app";
import { NastRequest, NastNext, NastResponse } from "./nast/types/types";
function Bootsrap() {
  const app = NastFactory.craete(AppModule);

  app.listen(3000);
  // app.listen(3001);
}

Bootsrap();
