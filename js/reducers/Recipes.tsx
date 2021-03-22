import { AnyAction } from "redux"
import { Action } from "../actions/types"

export type RecipeSection = {
    title: string,
    data: Array<Recipe>,
}

export type Recipe = {
  name: string,
  id : string,
  incredientCards: Array<IncredientCard>
}

export type IncredientCard = {
  name?: string,
  incredients: Array<Incredient>
}

export type Incredient = {
  name: string,
  quantitiy?: number,
  unit: Unit,
}

export type Unit = "cup" | "g" | "ml" | "l";


export type RecipesState = {
    sections: Array<RecipeSection>;
}

const initialState : RecipesState = {
    sections : [
      {
        title : "Default",
        data : [],
      }
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
  switch (action.type) {
    case "Section/Added": 
      const newSection = action.payload;
      console.log("New Section: " + newSection);
      return {...state, sections: [...state.sections, {title: newSection, data: []}]}
    case "Recipe/Added":
      const recipeId = action.payload;
      console.log("Adding recipe with id: " + recipeId);
      return {...state, sections: [...state.sections.map(value => {
        if (value.title === "Default") {
          value.data.push({
            name : "New Recipe",
            id : recipeId,
            incredientCards : [],
          })
        } 
        return value;
      })]}
    case "Recipe/Edited":
      return state;
    default:
      return state;
  }
}

export default recipes;