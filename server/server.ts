import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { connectDB } from "./database/connections/mainDatabase";
import rateLimit from "express-rate-limit";
import { handleError } from "./errors/error";
import { setRouter } from "./routers/sets.router";

(async () => {
  await connectDB();
})();

// connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(json());

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per 'window' (here, per 5 minutes)
  })
);

// (async () => {
//   console.log(await SetRecord.findAll(""));
// })();

app.use("/set", setRouter);
app.use(handleError);

app.listen(3001, "0.0.0.0", () => {
  console.log("Listening on http://localhost:3001");
});
