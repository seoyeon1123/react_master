import styled from 'styled-components';
import React from 'react';

interface ContainerProps {
  bgColor: string;
}
//interface : object에 대한 설명

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  bgColor: string;
}

const Circle = ({ bgColor }: CircleProps) => {
  return (
    <>
      <Container bgColor={bgColor}></Container>
    </>
  );
};

export default Circle;

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} You are${playerObj.age} years old`;

sayHello({ name: '서연', age: 25 });
