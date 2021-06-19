import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../../store/recipes/recipes-action";
import { Recipe } from "src/app/pages/recipes/recipe.model";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchReciepes = this.action$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        "https://recipecustom.firebaseio.com/recipes.json"
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.action$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select("recipes")),
    switchMap(([actionData, recipeState]) => {
      console.log("checkin");
      console.log(recipeState.recipes);
      this.http
        .put(
          "https://recipecustom.firebaseio.com/recipes.json",
          recipeState.recipes
        )
        .subscribe((data) => {
          console.log(data);
        });
    })
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
