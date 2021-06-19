import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes =  [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // {
  //   path: 'recipes',
  //   loadChildren: () => import('./pages/recipes/recipes.module').then(m => m.RecipeModule)
  // },
  // {
  //   path: 'shopping-list',
  //   loadChildren: ()=> import('./pages/shopping-list/shopping.list.module').then(m=>m.ShoppingListModule) 
  // }

  { path: 'recipes', loadChildren: './pages/recipes/recipes.module#RecipeModule'  }  ,

  { path: 'shopping-list' , loadChildren: './pages/shopping-list/shopping.list.module#ShoppingListModule'

  },
  {
    path: 'auth', loadChildren:'./pages/auth/auth.module#AuthModule'
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
