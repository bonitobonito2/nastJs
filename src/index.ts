import { NextFunction } from "express";
import { AppModule } from "./module/app.module";
import { NastFactory } from "./nast/app/app";
import { NastRequest, NastNext, NastResponse } from "./nast/types/types";
function Bootsrap() {
  const app = NastFactory.create(AppModule);

  app.listen(3000);
  // app.listen(3001);
}

Bootsrap();

function numIslands(grid: string[][]): number {
  let islands: number = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == "1") {
        islands++;
        dfs(grid, i, j);
      }
    }
  }

  return islands;
}

function dfs(grid: string[][], i: number, j: number) {
  if (
    i < 0 ||
    i >= grid.length ||
    j < 0 ||
    j >= grid[i].length ||
    grid[i][j] == "0"
  )
    return 0;
  grid[i][j] = "0";
  dfs(grid, i++, j);
  dfs(grid, i, j++);
  dfs(grid, i--, j);
  dfs(grid, i, j--);
}

console.log(
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ])
);
