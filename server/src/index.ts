import express from "express";
import cors from "cors";
import "dotenv/config";

import { getStockData } from "./stockData/stockdata";

const app = express();

app.use(cors());

app.get("/", getStockData);

app.listen(4000, () => {
  console.log("server running on port 4000");
});
