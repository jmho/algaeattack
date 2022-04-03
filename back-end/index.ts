import express from "express";
import dataProcessorRouter from "./src/routes/dataProcessor";
import { connectToDb } from "database";
import cors from "cors";

const app = express();
const PORT = 8000;

async function main() {
  await connectToDb();

  console.log("Connected to database.");

  app.use(cors());

  app.use(express.static("public"));

  app.use(express.json());

  app.use("/api/v1/dataProcessor", dataProcessorRouter);

  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
}

main();
