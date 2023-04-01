import Highcharts, { Options } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { StockData, TimeSerie } from "../lib/types";

// Parses time data for HighCharts
const parseTimeSeries = (timeSeriesData: TimeSerie[]): number[][] => {
  return timeSeriesData.map((timeSerieData) => {
    return Object.values(timeSerieData);
  });
};

type Props = {
  data: StockData;
};

const Chart = ({ data }: Props) => {
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
      selected: 2,
    },

    title: {
      text: title,
    },

    series: [
      {
        type: "candlestick",
        name: `${data.symbol} Stock Price`,
        data: graphData,
        dataGrouping: {
          units: [
            ["week", [1]],
            ["month", [1]],
          ],
        },
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={chartOptions}
    />
  );
};

export default Chart;
