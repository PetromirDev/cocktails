import axios from "axios"

export const getCocktailDetails = (url: string) =>
  axios.get(url).then((res) => {
    const drinkTemp = res.data.drinks[0]
    Object.keys(drinkTemp).forEach((key) => {
      if (!drinkTemp[key]) {
        delete drinkTemp[key]
      }
    })
    const ingredients = []
    for (let key in drinkTemp) {
      if (/strIngredient\d/.test(key)) {
        const match = key.match(/\d/)
        let num
        if (match && match?.length >= 0) {
          num = match[0]
        }
        ingredients.push(
          `${drinkTemp[key]}- ${drinkTemp[`strMeasure${num}`] || "by taste"}`,
        )
        delete drinkTemp[key]
        delete drinkTemp[`strMeasure${num}`]
      }
    }
    return {
      ...drinkTemp,
      ingredients: ingredients,
    }
    // console.log(ingredients, drinkTemp)
  })
