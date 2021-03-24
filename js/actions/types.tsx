import { Recipe } from "../reducers/Recipes";

export type Action =
    | { type: "Recipe/Added", payload: {recipeId: string}}
    | { type: "Recipe/Update", payload: {recipeId: string, recipeUpdate: Partial<Recipe>}}