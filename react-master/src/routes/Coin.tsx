import { useParams } from 'react-router';
import React from 'react';

interface RouteParams {
  coinId: string;
}

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  return <h1>Coin: {coinId}</h1>;
};
export default Coin;
