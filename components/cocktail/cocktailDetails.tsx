import React, { FC, useState } from "react";
import styled from "styled-components";
// Helpers
import { getFavourites } from "../../helpers/getFavourites";
// Styles
import { Center } from "../../styles/utils";

const CocktailDetails: FC<{
  id: string;
  name: string;
  instructions: string;
  image: string;
  ingredients: string[];
  handleClose: () => void;
  render?: React.ReactElement | React.ReactElement[];
}> = ({ id, name, instructions, image, ingredients, handleClose, render }) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(() => {
    const favourites = getFavourites();
    if (favourites.find((favourite) => favourite.id === id)) {
      return true;
    }
    return false;
  });

  const addToFavourites = () => {
    if (!isFavourite) {
      const favourite = {
        id: id,
        dateAdded: Date.now()
      };
      const favourites = getFavourites();

      favourites.push(favourite);
      setIsFavourite(true);

      localStorage.setItem("favourite-cocktails", JSON.stringify(favourites));
    }
  };

  const removeFromFavourites = () => {
    if (isFavourite) {
      let favourites = getFavourites();

      if (favourites.find((favourite) => favourite.id === id)) {
        favourites = favourites.filter((favourite) => favourite.id !== id);
        setIsFavourite(false);
      }

      localStorage.setItem("favourite-cocktails", JSON.stringify(favourites));
      window.dispatchEvent(new Event("favourites-remove"));
    }
  };

  return (
    <DetailsWrapper onClick={handleClose}>
      <Details onClick={(e) => e.stopPropagation()}>
        <MobileCloseIcon
          onClick={handleClose}
          src="https://www.freeiconspng.com/thumbs/close-icon/close-icon-39.png"
          alt="close-mobile"
        />
        <Image src={image} alt={name} />
        <Body>
          <CloseIcon
            onClick={handleClose}
            src="https://www.freeiconspng.com/thumbs/close-icon/close-icon-39.png"
            alt="close"
          />
          <Name>{name}</Name>
          <Instructions>{instructions}</Instructions>
          <Separator />
          <Label>Ingredients</Label>
          <Ingredients>
            {ingredients.map((ingredient) => (
              <Ingredient key={ingredient}>{ingredient}</Ingredient>
            ))}
          </Ingredients>
          <Separator />
          {!isFavourite ? (
            <AddToFavouritesBtn onClick={addToFavourites}>Add to favourites</AddToFavouritesBtn>
          ) : (
            <RemoveFromFavouritesBtn onClick={removeFromFavourites}>Remove from favourites</RemoveFromFavouritesBtn>
          )}
          {render}
        </Body>
      </Details>
    </DetailsWrapper>
  );
};

export default CocktailDetails;

const DetailsWrapper = styled(Center)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 80px;
  background-color: rgba(0, 0, 0, 0.3);
  @media (max-width: 800px) {
    padding: 20px;
  }
`;

const Details = styled.div`
  display: flex;
  max-width: 1300px;
  max-height: 80vh;
  width: 100%;
  @media (max-width: 1150px) {
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background-color: #fff;
    width: auto;
  }
  @media (max-width: 800px) {
    max-height: 100vh;
  }
`;

const Image = styled.img`
  flex: 1;
  max-width: 600px;
  width: 100%;
  @media (max-width: 1150px) {
    max-width: 300px;
  }
`;

const Body = styled.div`
  overflow: auto;
  flex: 1;
  padding: 40px;
  padding-left: 80px;
  padding-bottom: 60px;
  background-color: #fff;
  @media (max-width: 1150px) {
    padding: 0;
    padding: 20px;
    text-align: center;
  }
`;

const Name = styled.h2`
  font-size: 3rem;
  max-width: 80%;
  @media (max-width: 1150px) {
    max-width: 100%;
  }
`;

const Instructions = styled.p`
  margin-top: 15px;
  opacity: 0.6;
  font-size: 1.2rem;
  max-width: 80%;
  @media (max-width: 1150px) {
    max-width: 100%;
  }
`;

const Separator = styled.hr`
  margin: 20px 0;
  border-color: transparent;
`;

const Label = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 10px;
  @media (max-width: 1150px) {
    font-size: 1.8rem;
  }
`;

const Ingredients = styled.ul`
  padding-left: 40px;
  @media (max-width: 1150px) {
    padding-left: 0;
  }
`;

const Ingredient = styled.li`
  font-size: 1.2rem;
  margin-top: 10px;
`;

const AddToFavouritesBtn = styled.button`
  border: 1px solid black;
  background-color: #fff;
  color: #000;
`;

const RemoveFromFavouritesBtn = styled.button`
  border: 1px solid black;
  background-color: #000;
  color: #fff;
`;

const CloseIcon = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  margin-left: auto;
  cursor: pointer;
  @media (max-width: 1150px) {
    display: none;
  }
`;

const MobileCloseIcon = styled(CloseIcon)`
  display: none;
  margin-left: auto;
  margin-bottom: 15px;
  width: 30px;
  height: 30px;
  @media (max-width: 1150px) {
    display: block;
  }
`;
