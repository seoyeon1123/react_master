const BASE_URL = `https://api.coinpaprika.com/v1`;

export function FetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function FetchCoinsInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function FetchCoinsTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function FetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((respons) => respons.json());
}
