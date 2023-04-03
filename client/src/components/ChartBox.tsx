import { useQuery } from 'react-query';

import Chart from './Chart';

import type { StockData } from '../lib/types';

// data fetcher
const fetchStockData = async (symbol: string): Promise<StockData> => {
  const response = await fetch(
    `https://chart-app.onrender.com/api?symbol=${symbol}`
  );

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
  throw new Error();
};

type Props = {
  symbol: string;
};

const ChartBox = ({ symbol }: Props) => {
  const {
    data: stockData,
    isError,
    isLoading,
  } = useQuery<StockData>(['stock-data', symbol], () => fetchStockData(symbol));

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !stockData) {
    return <h1>Try again later...</h1>;
  }

  return (
    <div className="w-full max-w-[1200px]">
      <Chart data={stockData} />
    </div>
  );
};

export default ChartBox;
