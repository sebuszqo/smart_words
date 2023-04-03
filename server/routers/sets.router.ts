import { Request, Response, Router } from "express";
import { SetRecord } from "../records/sets";

export const setRouter = Router();

setRouter
  // to find sets that includes this name, and to get all the sets available
  .get("/search/:name?", async (req: Request, res: Response) => {
    let name = req.params.name;
    if (!name) {
      name = " ";
    }
    try {
      const sets = await SetRecord.findAll(name);
      res.json(sets);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  //  To get single set
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const set = await SetRecord.findOne(`${req.params.id}`);
      res.json(set);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  // .get("/search/:name?", (req: Request, res: Response) => {
  //   //   This path is to get searched sets by name - if exists
  //  // Have been already made by .get with '/:name?'
  // })

  .post("/", async (req: Request, res: Response) => {
    try {
      const set = new SetRecord(req.body);
      const result = await set.insert();
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })

  .put("/:id", async (req: Request, res: Response) => {
    try {
      const setToUpdate = await SetRecord.findOne(req.params.id);
      const { name, description, words } = req.body;

      if (name) {
        setToUpdate.name = name;
      }
      if (description) {
        setToUpdate.description = description;
      }
      if (words) {
        setToUpdate.words = words;
      }
      const result = await setToUpdate.update();
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await SetRecord.delete(req.params.id);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
