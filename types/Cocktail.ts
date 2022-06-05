export type CocktailCardType = {
  id: string
  name: string
  image: string
  onClick?: () => void
}

export type CocktailApiType = {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

export type CocktailDetailsApiType = {
  dateModified: string
  idDrink: string
  strAlcoholic: string
  strCategory: string
  strDrink: string
  strDrinkThumb: string
  strGlass: string
  strInstructions: string
  ingredients: string[]
}

export type CocktailFavouritesType = {
  id: string
  dateAdded: number
}
