import { FC } from "react";
import styled from "styled-components";
// Types
import { CocktailCardType } from "../../types/Cocktail";

const CocktailCard: FC<CocktailCardType> = ({ name, image, id, onClick }) => {
  return (
    <Card image={image} onClick={onClick}>
      <Name>{name}</Name>
    </Card>
  );
};

export default CocktailCard;

const Card = styled.div<{ image: string }>`
  position: relative;
  width: 300px;
  height: 300px;
  padding: 10px;
  margin-bottom: 30px;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: contain;
  cursor: pointer;
`;

const Name = styled.h2`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  padding: 15px;
  border: 1px solid black;
  background-color: #fff;
  font-size: 1.2rem;
  text-align: center;
`;
