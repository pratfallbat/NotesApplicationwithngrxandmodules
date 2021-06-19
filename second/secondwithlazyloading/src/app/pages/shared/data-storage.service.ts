import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  debugger;
  constructor(private http: HttpClient, private recipeService: RecipeService,private authService:AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    debugger;
    this.http
      .put(
        // 'https://dummy-47145-default-rtdb.firebaseio.com/recipes.json',
        'https://recipecustom.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

//   fetchRecipes() {
//     // this.authService.user.subscribe();
//     // then unsubscribe
//     // or
//     // this.authService.user.pipe(take(1)).subscribe(user => {
      
//     // });
//     // i only wnat 1 value and after it should unsubscribe automatically
//     // gives me latest user and not  the future user.
// // so we need to do above vefore below call
//     return this.authService.user.pipe(
//       take(1),
//       exhaustMap(user => {
//         return this.http.get<Recipe[]>(
//           // 'https://dummy-47145-default-rtdb.firebaseio.com/recipes.json'
//           'https://recipecustom.firebaseio.com/recipes.json', {
//             params:new HttpParams().set('auth',user.token)
//           }
//         );
  
//       }),
//       map(recipes => {
//         return recipes.map(recipe => {
//           return {
//             ...recipe,
//             ingredients: recipe.ingredients ? recipe.ingredients : []
//           };
//         });
//       }),
//       tap(
//         recipes => {
//           this.recipeService.setRecipes(recipes);
//         })
//     );
    //  old way of doing it in one dunction
//   }
  fetchRecipes() {
    // this.authService.user.subscribe();
    // then unsubscribe
    // or
    // this.authService.user.pipe(take(1)).subscribe(user => {
      
    // });
    // i only wnat 1 value and after it should unsubscribe automatically
    // gives me latest user and not  the future user.
// so we need to do above vefore below call
  
        return this.http.get<Recipe[]>(
          // 'https://dummy-47145-default-rtdb.firebaseio.com/recipes.json'
          'https://recipecustom.firebaseio.com/recipes.json'
        ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(
        recipes => {
          this.recipeService.setRecipes(recipes);
        })
    );
     
  }
}
