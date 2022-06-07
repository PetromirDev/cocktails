import InfiniteScroll from "react-infinite-scroll-component";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
// Components
import Navbar from "../components/utils/navbar";
import CocktailCard from "../components/cocktail/cocktailCard";
import CocktailDetails from "../components/cocktail/cocktailDetails";
import Footer from "../components/utils/footer";
import Search from "../components/home/search";
// Helpers
import { getCocktailDetails } from "../helpers/api/getCocktailDetails";
// Styles
import { CocktailsWrapper, Container } from "../styles/utils";
// Types
import type { NextPage } from "next";
import { CocktailApiType, CocktailDetailsApiType } from "../types/Cocktail";

const Home: NextPage = () => {
  const [cocktails, setCocktails] = useState<CocktailApiType[]>([]);
  const [selectedCocktail, setSelectedCocktail] = useState<null | CocktailDetailsApiType>(null);
  const [last, setLast] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleFetch = () => {
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail").then((res) => {
      setCocktails(res.data.drinks);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleGetCocktailDetails = (id: string) =>
    getCocktailDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((cocktail) => setSelectedCocktail(cocktail))
      .catch(() => alert("Failed to get cocktail details"));

  const getRandomCocktail = () =>
    getCocktailDetails("https://www.thecocktaildb.com/api/json/v1/1/random.php?c=Cocktail")
      .then((cocktail) => setSelectedCocktail(cocktail))
      .catch(() => alert("Failed to get a random cocktail"));

  const removeSelectedCocktail = () => setSelectedCocktail(null);

  const handlePagination = () => setLast((last) => last + 20);

  const handleSearch = (search: string) => {
    setIsLoading(true);
    setLast(0);
    if (search !== "") {
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?c=Cocktail&s=${search}`).then((res) => {
        setCocktails(res.data.drinks);
      });
    } else {
      handleFetch();
    }
    setIsLoading(false);
  };

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
        />
      ) : null}
      <Navbar />
      <Hero>
        <Cocktail src="/images/hero-cocktail1.jpg" alt="cocktail1" />
        <HeroBody>
          <Header>
            Welcome to <Logo>Cocktails</Logo>
          </Header>
          <Text>
            The place where you can find the best cocktails. Each cocktail on our website has it&apos;s ingredients
            listed as well as text instructions and a youtube video on how to prepare it.
          </Text>
          <GetRandomBtn onClick={getRandomCocktail}>Random cocktail</GetRandomBtn>
        </HeroBody>
        <Cocktail src="/images/hero-cocktail2.jpg" alt="cocktail2" />
      </Hero>
      <Search handleSearch={handleSearch} />
      {!isLoading && cocktails !== null && cocktails.length !== 0 ? (
        <InfiniteScroll
          dataLength={cocktails.slice(0, last + 20).length}
          next={handlePagination}
          hasMore={cocktails.length > last + 1}
          loader={<p>...</p>}
        >
          <CocktailsWrapper>
            {cocktails.slice(0, last + 20).map((cocktail) => (
              <CocktailCard
                key={cocktail.idDrink}
                id={cocktail.idDrink}
                name={cocktail.strDrink}
                image={cocktail.strDrinkThumb}
                onClick={() => handleGetCocktailDetails(cocktail.idDrink)}
              />
            ))}
          </CocktailsWrapper>
        </InfiniteScroll>
      ) : (
        <Text>We didn&apos;t manage to find a cocktail with this name</Text>
      )}
      <Footer />
    </Container>
  );
};

export default Home;

const Hero = styled.section`
  display: flex;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 80px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 3.2rem;
`;

const Text = styled.p`
  margin: 30px 0;
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.6;
`;

const GetRandomBtn = styled.button`
  display: block;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
  font-size: 1.2rem;
  transition: 0.3s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #000;
  }
`;

const Cocktail = styled.img`
  display: block;
  width: 300px;
  @media (max-width: 1130px) {
    display: none;
  }
`;

const Logo = styled.span`
  color: #c30d03;
`;

const HeroBody = styled.div`
  margin: 0 20px;
`;
