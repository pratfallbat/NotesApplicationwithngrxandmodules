import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { RecipeService } from './pages/recipes/recipe.service';
import { ShoppingListService } from './pages/shopping-list/shopping-list.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './pages/auth/auth.component';

import { AuthInterceptorService } from './pages/auth/auth-interceptor';
import { AlertComponent } from './pages/shared/alert/alert.component';

import { RecipeModule } from './pages/recipes/recipes.module';
import { ShoppingListModule } from './pages/shopping-list/shopping.list.module';
import { SharedModule } from './pages/shared/shared.module';
import { CoreModule } from './pages/core.module';
import { AuthModule } from './pages/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,    
 
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipeModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule
  ],
  
  bootstrap: [AppComponent]
  
 
})
export class AppModule { }
