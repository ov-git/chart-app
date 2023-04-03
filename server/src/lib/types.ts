export type StockData = {
  success: boolean;
  error?: string;
  data?: {
    symbol: string;
    timeSeries: TimeSerie[];
  };
};

export type TimeSerie = {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
};
