import { FC } from "react"
import styled from "styled-components"
// Helpers
import { getFavourites } from "../../helpers/getFavourites"

const CocktailStatus: FC<{ dateModified: string; id: string }> = ({
  dateModified,
  id,
}) => {
  const favourites = getFavourites()
  const currentCocktail = favourites.find((favourite) => favourite.id === id)

  return typeof currentCocktail === "object" &&
    Date.parse(dateModified) > currentCocktail?.dateAdded ? (
    <Text>Cocktail has changed since you favourited it.</Text>
  ) : null
}

export default CocktailStatus

const Text = styled.h4`
  font-size: 1rem;
  margin-top: 15px;
`
