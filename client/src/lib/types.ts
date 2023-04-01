export type StockData = {
  symbol: string;
  timeSeries: TimeSerie[];
};

export type TimeSerie = {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
};
