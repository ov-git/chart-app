import https from "https";
import { Request, Response } from "express";

import type { StockData, TimeSerie } from "../lib/types";

export const getStockData = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.query;
    const options = {
      method: "GET",
      hostname: "www.alphavantage.co",
      path: `/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${process.env.API_KEY}`,
    };
    const httpReq = https.request(options, function (httpRes) {
      httpRes.setEncoding("utf8");
      let data = "";

      httpRes.on("data", function (chunk) {
        data += chunk;
      });

      httpRes.on("end", function () {
        const stockDataResponse = createResponse(data);
        if (stockDataResponse.success) {
          res.status(200).json(stockDataResponse);
        } else {
          res.status(500).json(stockDataResponse);
        }
      });
    });

    httpReq.on("error", (error) => {
      res
        .status(500)
        .json({ success: false, error: "Error fetching the data" });
    });

    httpReq.end();
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

function createResponse(data: string): StockData {
  try {
    const jsonData: unknown = JSON.parse(data);
    const [metaData, dailyResults] = Object.keys(jsonData);
    const symbol: string = jsonData[metaData]["2. Symbol"];
    const dataByDate: unknown = jsonData[dailyResults];

    const timeSeries = parseTimeSeries(Object.entries(dataByDate));

    const parsed: StockData = {
      success: true,
      data: {
        symbol,
        timeSeries,
      },
    };

    return parsed;
  } catch (error) {
    return { success: false, error: "Invalid response data" };
  }
}

function parseTimeSeries(timeData: unknown[][]): TimeSerie[] {
  return timeData
    .map((dayData: unknown[]) => {
      const date = dayData[0];
      const dailyData = dayData[1];

      if (typeof date !== "string") {
        throw new Error();
      }

      return {
        date: Date.parse(date),
        open: +dailyData["1. open"],
        high: +dailyData["2. high"],
        low: +dailyData["3. low"],
        close: +dailyData["4. close"],
      };
    })
    .reverse();
}
