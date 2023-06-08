import { atom } from "recoil";

export const allRecipesState = atom({
  key: 'allRecipesState',
  default: []
})

export const pageCountState = atom({
  key: 'pageCountState',
  default: 1
})

export const recipesParamsState = atom({
  key: 'recipesParamsState',
  default: {page: 1, limit: 8}
})

export const recipeState = atom({
  key: 'recipeState',
  default: {}
})