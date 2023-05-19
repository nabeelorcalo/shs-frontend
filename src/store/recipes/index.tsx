import { atom } from "recoil";

export const allRecipesState = atom({
  key: 'allRecipesState',
  default: []
})

export const recipeState = atom({
  key: 'recipeState',
  default: []
})