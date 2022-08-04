import cors from "cors"
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import logger from "./misc/logger";
import appRouter from "./routes";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());


app.use("/", (req: Request, res: Response) => {
  logger.info("Logging from \/");
  res.send({data: "Welcome to the VAS backend!!"});
});

app.use(appRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.clear();
  logger.info(`Server is running on port ${PORT}`);
});

