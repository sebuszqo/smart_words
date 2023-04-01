import { Request, Response, Router } from "express";

export const setRouter = Router();

setRouter
  .get("/", (req: Request, res: Response) => {
    //@TODO
    //    This path is to get all of the available sets of words
  })
  .get("/search/:name?", (req: Request, res: Response) => {
    //@TODO
    //   This path is to get searched sets by name - if exists
  })
  .get("/:id", (req: Request, res: Response) => {
    // @TODO
    //    This path is to get single sets of words when someone picked which set he/she want to learn
  })
  .post("/", (req: Request, res: Response) => {
    // @TODO
    //    This path is to add new objects - new sets of words to database
  })
  .put("/:id", (req: Request, res: Response) => {
    // @TODO
    //    This path is to edit existing sets
  })
  .delete("/:id", (req: Request, res: Response) => {
    // @TODO
    //    This path is to delete set of words
  });
