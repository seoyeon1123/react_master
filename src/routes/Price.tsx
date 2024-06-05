import React from 'react';
import { useQuery } from 'react-query';
import ApexCharts from 'react-apexcharts';
import { FetchCoinsTickers } from '../Api';

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps): JSX.Element {
  const { isLoading, data } = useQuery<PriceData>(
    ['price_detail', coinId],
    () => FetchCoinsTickers(coinId)
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexCharts
          type="bar"
          height={350}
          series={[
            {
              name: 'Price',
              data: [
                data.quotes.USD.percent_change_1h,
                data.quotes.USD.percent_change_6h,
                data.quotes.USD.percent_change_12h,
                data.quotes.USD.percent_change_24h,
              ],
              // 각각의 시리즈에 대한 색상 설정
              color: '#FF5733',
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },

            chart: {
              type: 'bar',
              height: 450,
              width: 450,
              background: 'transparent',
              toolbar: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            annotations: {},
            xaxis: {
              categories: ['1h', '6h', '12h', '24h'],
              position: 'top',
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
