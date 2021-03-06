import { CocktailFavouritesType } from "../types/Cocktail";

export const getFavourites = () => {
  let favourites: CocktailFavouritesType[] = [];

  const favouritesRaw = localStorage.getItem("favourite-cocktails");

  if (typeof favouritesRaw === "string" && favouritesRaw.length > 0 && favouritesRaw !== "[]") {
    favourites = JSON.parse(favouritesRaw);
  }

  return favourites;
};
