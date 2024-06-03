import React from 'react';
import { useQuery } from 'react-query';
import { FetchCoinHistory } from '../Api';
import ApexChart from 'react-apexcharts';

interface chartProps {
  coinId: string;
}

interface IData {
  time_opne: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: chartProps) => {
  const { isLoading, data } = useQuery<IData[]>(['ohlvc', coinId], () =>
    FetchCoinHistory(coinId)
  );
  return <></>;
};

export default Chart;
