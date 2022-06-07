import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Helpers
import { getCocktailDetails } from "../helpers/api/getCocktailDetails";
import { getFavourites } from "../helpers/getFavourites";
// Components
import Navbar from "../components/utils/navbar";
import CocktailCard from "../components/cocktail/cocktailCard";
import CocktailDetails from "../components/cocktail/cocktailDetails";
import CocktailStatus from "../components/cocktail/cocktailStatus";
import Footer from "../components/utils/footer";
// Styles
import { Center, CocktailsWrapper, Container } from "../styles/utils";
// Types
import { CocktailDetailsApiType } from "../types/Cocktail";

const Favourites: NextPage = () => {
  const [cocktails, setCocktails] = useState<CocktailDetailsApiType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCocktail, setSelectedCocktail] = useState<null | CocktailDetailsApiType>(null);

  const initialFetch = () => {
    setCocktails([]);
    const favourites = getFavourites();
    if (favourites.length > 0) {
      for (let i = 0; i < favourites.length; i++) {
        const id = favourites[i].id;
        getCocktailDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then((cocktail) => {
            setCocktails((prev) => [...prev, cocktail]);
            if (i === favourites.length - 1) {
              setIsLoading(false);
            }
          })
          .catch(() => {
            alert("Failed to show cocktail");
          });
      }
    } else {
      setIsLoading(false);
    }
  };

  const storageListener = () => {
    initialFetch();
  };

  useEffect(() => {
    window.addEventListener("favourites-remove", storageListener);

    initialFetch();

    return () => {
      window.removeEventListener("favourites-remove", storageListener);
    };
  }, []);

  const removeSelectedCocktail = () => setSelectedCocktail(null);

  return (
    <Container>
      {selectedCocktail ? (
        <CocktailDetails
          id={selectedCocktail.idDrink}
          name={selectedCocktail.strDrink}
          instructions={selectedCocktail.strInstructions}
          image={selectedCocktail.strDrinkThumb}
          ingredients={selectedCocktail.ingredients}
          handleClose={removeSelectedCocktail}
          render={<CocktailStatus dateModified={selectedCocktail.dateModified} id={selectedCocktail.idDrink} />}
        />
      ) : null}
      <Navbar />
      {!isLoading && cocktails.length > 0 ? (
        <React.Fragment>
          <FavouriteHeader>Your favourite cocktails</FavouriteHeader>
          <CocktailsWrapper>
            {cocktails.map((cocktail) => (
              <CocktailCard
                key={cocktail.idDrink}
                id={cocktail.idDrink}
                name={cocktail.strDrink}
                image={cocktail.strDrinkThumb}
                onClick={() => setSelectedCocktail(cocktail)}
              />
            ))}
          </CocktailsWrapper>
          <Footer />
        </React.Fragment>
      ) : !isLoading && cocktails.length === 0 ? (
        <EmptyWrapper>
          <EmptyImage src="/images/favourite-cocktail1.jpg" />
          <EmptyLabel>Wow, no favourites?</EmptyLabel>
        </EmptyWrapper>
      ) : null}
    </Container>
  );
};

export default Favourites;

const FavouriteHeader = styled.h1`
  font-size: 4rem;
  text-align: center;
  margin: 80px 0;
  @media (max-width: 800px) {
    font-size: 2.5rem;
  }
`;

const EmptyWrapper = styled(Center)`
  flex-direction: column;
  margin: 0 auto;
  padding: 40px;
`;

const EmptyLabel = styled.h1`
  text-align: center;
  margin-left: 40px;
  margin-top: 20px;
  font-size: 4rem;
  @media (max-width: 800px) {
    font-size: 2.5rem;
    margin-left: 10px;
  }
`;

const EmptyImage = styled.img`
  max-width: 400px;
  width: 100%;
  @media (max-width: 800px) {
    max-width: 300px;
  }
`;
