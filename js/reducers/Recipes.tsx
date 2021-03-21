import { AnyAction } from "redux"
import { Action } from "../actions/types"

export type RecipeSection = {
    title: string,
    data: Array<Recipe>,
}

export type Recipe = {
    name: string,
}

export type RecipesState = {
    sections: Array<RecipeSection>;
}

const initialState : RecipesState = {
    sections : [
        {
          title: "Main dishes",
          data: [ {name : "Japanese Curry"}, {name : "Vegan Burger"}, {name : "Spaghetti Carbonara"}],
        },
        {
          title: "Breakfast",
          data: [{name : "Cerealzz"}, {name : "Belegte Brötchen (Rollies)"}],
        },
      ]
}

/**
 * Reducer function for recipes.
 * 
 * Handles recipe-related Actions and updates its state.
 * 
 * @param state 
 * @param action 
 */
function recipes(state : RecipesState = initialState, action: AnyAction) : RecipesState {
  return state;
}

export default recipes;