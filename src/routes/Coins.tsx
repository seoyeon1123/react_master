import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { FetchCoins } from '../Api';
import { isDarkAtom } from '../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 0px 10px;
  max-width: 700px;
  margin: 2git0px auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between; /* 내부 요소들을 수평으로 정렬 */
  align-items: center;
`;

const CoinList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Coin = styled.li`
  width: 150px; /* 가로 크기 */
  height: 150px; /* 세로 크기 */
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid white;
  margin-bottom: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  a {
    transition: color 0.2s ease-in-out;
    text-align: center;
    display: block;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 50px; /* 이미지 크기 조절 */
  height: 50px; /* 이미지 크기 조절 */
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  text-align: center; /* 텍스트를 수평으로 정렬 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CustomFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}

const Coins = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const [isToggled, setIsToggled] = useState(true);

  const toggleDarkAtom = () => {
    setIsToggled((prev) => !prev);
    setDarkAtom((prev) => !prev);
  };

  const { isLoading, data } = useQuery<ICoin[]>('allCoins', FetchCoins);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
        <CustomFontAwesomeIcon
          onClick={toggleDarkAtom}
          icon={isToggled ? faToggleOff : faToggleOn}
        />
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <br></br>
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
