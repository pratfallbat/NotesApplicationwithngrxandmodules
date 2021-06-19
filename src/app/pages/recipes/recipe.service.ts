import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient';

import { Recipe } from './recipe.model';
import * as ShoopingListActions from '../../store/shopping-list/shopping-list.action';

import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeService {
  // debugger;
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private store:Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    // debugger;
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // debugger;
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoopingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    // debugger;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
