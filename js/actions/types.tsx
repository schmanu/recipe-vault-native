import { Recipe } from "../reducers/Recipes";

export type Action =
    | { type: "Section/Added", payload: string }
    | { type: "Recipe/Added", payload: string }
    | { type: "Recipe/Edited", payload: Recipe}