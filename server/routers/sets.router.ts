import { Request, Response, Router } from "express";
import { SetRecord } from "../records/sets";

export const setRouter = Router();

setRouter
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params;
      const set = await SetRecord.findOne(`${id}`);
      res.json(set);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  // .get("/search/:name?", (req: Request, res: Response) => {
  //   //@TODO
  //   //   This path is to get searched sets by name - if exists
  // })

  .get("/:name", async (req: Request, res: Response) => {
    try {
      const sets = await SetRecord.findAll(req.params.name);
      res.json(sets);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })

  .post("/", async (req: Request, res: Response) => {
    try {
      const set = new SetRecord(req.body);
      const result = await set.insert();
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })

  .put("/:id?", async (req: Request, res: Response) => {
    try {
      const setToUpdate = await SetRecord.findOne(req.params.id);
      const { name, description, words } = req.body;
      setToUpdate.description = description;
      setToUpdate.name = name;
      setToUpdate.words = words;
      const result = await setToUpdate.update();
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .delete("/:id", (req: Request, res: Response) => {
    // @TODO
    //    This path is to delete set of words
  });
