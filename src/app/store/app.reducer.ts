import * as fromShoppingList from "./shopping-list/shopping-list.reducer";

import * as fromAuth from "./auth/auth.reducer";
import * as fromRecipeList from "./recipes/recipes-reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipeList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,

  auth: fromAuth.authReducer,

  recipes: fromRecipeList.RecipesReducer,
};
