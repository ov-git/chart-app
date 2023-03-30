import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "Success" });
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});
