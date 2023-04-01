import { Request, Response, Router } from "express";
import { SetRecord } from "../records/sets";

export const setRouter = Router();

setRouter
  .get("/:id", async (req: Request, res: Response) => {
    const id = req.params;
    const set = await SetRecord.findOne(`${id}`);
    res.json(set);
  })
  .get("/search/:name?", (req: Request, res: Response) => {
    //@TODO
    //   This path is to get searched sets by name - if exists
  })

  .get("/:name", async (req: Request, res: Response) => {
    const sets = await SetRecord.findAll(req.params.name);
    res.json(sets);
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
