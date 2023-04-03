import { useState } from "react";

import Highcharts, { Options } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import type { StockData, TimeSerie } from "../lib/types";

// Parses data for HighCharts
const parseTimeSeries = (timeSeriesData: TimeSerie[]): number[][] => {
  return timeSeriesData.map((timeSerieData) => {
    return Object.values(timeSerieData);
  });
};

type Props = {
  data: StockData;
};

const Chart = ({ data }: Props) => {
  const [chartType, setChartType] = useState<
    "candlestick" | "line" | "area" | "spline"
  >("line");
  const title = data.symbol;
  const graphData = parseTimeSeries(data.timeSeries);

  const chartOptions: Options = {
    rangeSelector: {
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1M",
        },
        {
          type: "month",
          count: 3,
          text: "3M",
        },
        {
          type: "all",
          count: 1,
          text: "All",
        },
      ],
      buttonTheme: {
        fill: "gray", // set the background color of the buttons
        stroke: "gray", // set the border color of the buttons
        "stroke-width": 1, // set the border width of the buttons
        style: {
          color: "white", // set the font color of the buttons
        },
        states: {
          hover: {
            fill: "lightgray", // set the background color of the buttons when hovered
            stroke: "lightgray", // set the border color of the buttons when hovered
          },
          select: {
            fill: "darkgray", // set the background color of the selected button
            stroke: "darkgray", // set the border color of the selected button
          },
        },
      },
      selected: 2,
    },

    title: {
      text: title,
    },

    series: [
      {
        type: chartType,
        name: `${data.symbol} Stock Price`,
        data: graphData,
        upColor: "green",
        upLineColor: "green",
        dataGrouping: {
          units: [
            ["week", [1]],
            ["month", [1]],
          ],
        },
      },
    ],
  };

  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChartType(
      event.target.value as "candlestick" | "line" | "area" | "spline"
    );
  };

  return (
    <div>
      <div>
        <label className="px-4 text-white" htmlFor="chart-type">
          Chart Type:
        </label>
        <select
          id="chart-type"
          value={chartType}
          onChange={handleChartTypeChange}
        >
          <option value="line">Line</option>
          <option value="candlestick">Candlestick</option>
          <option value="area">Area</option>
          <option value="spline">Spline</option>
        </select>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
};

export default Chart;
