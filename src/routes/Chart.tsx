import React from 'react';
import { useQuery } from 'react-query';
import { FetchCoinHistory } from '../Api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => FetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      <div>
        {isLoading ? (
          'Loading chart...'
        ) : (
          <ApexChart
            series={[
              {
                name: 'Price',
                data: data?.map((price) => Number(price.close)) ?? [],
              },
            ]}
            type="line"
            options={{
              theme: {
                mode: 'dark',
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: 'transparent',
              },
              grid: { show: false },
              stroke: {
                curve: 'smooth',
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: 'datetime',
                categories: data?.map((price) => price.time_close * 1000) ?? [],
              },
              fill: {
                type: 'gradient',
                gradient: {
                  gradientToColors: ['pink'],
                  stops: [0, 100],
                },
              },
              // 여기에 쉼표 추가
              colors: ['red'],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
}

export default Chart;
