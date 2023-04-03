import { createLogger, format, transports } from "winston";
import { NextFunction, Request, Response } from "express";

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: "SmartWordsApp" },
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;
  const status = res.statusCode;
  const message = `${method} ${url} ${status}`;

  logger.info(message);
  next();
};
