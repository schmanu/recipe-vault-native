import { AnyAction } from "@reduxjs/toolkit";
import { Action } from "../actions/types"

export type Recipe = {
  name: string,
  section: string,
  id: string,
  incredientCards: Array<IncredientCard>
}

export type IncredientCard = {
  name?: string,
  incredients: Array<Ingredient>
}

export type Ingredient = {
  name: string,
  quantitiy?: number,
  unit: Unit,
}

export type Unit = "cup" | "g" | "ml" | "l";


export type RecipesState = {
  recipes: Array<Recipe>;
}

const initialState: RecipesState = {
  recipes: [],
}

/**
 * Reducer function for recipes.
 * 
 * Handles recipe-related Actions and updates its state.
 * 
 * @param state 
 * @param action 
 */
function recipes(state: RecipesState = initialState, action: Action): RecipesState {
  switch (action.type) {
    case "Recipe/Added":
      const recipeId = action.payload.recipeId;
      console.log("Adding recipe with id: " + recipeId);
      return {...state, recipes: [...state.recipes, {
              name: "New Recipe",
              section: "Default",
              id: recipeId,
              incredientCards: [],
            }]};
    case "Recipe/Update":
      const recipeUpdate = action.payload.recipeUpdate;
      const updatedRecipes: Array<Recipe> = state.recipes.map(recipe => {
          if (recipe.id === action.payload.recipeId) {
            return {...recipe, ...recipeUpdate};
          } else {
            return recipe;
          }
      });
      return { ...state, recipes: updatedRecipes }
    default:
      return state;
  }
}

export default recipes;