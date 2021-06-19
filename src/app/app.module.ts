import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./pages/header/header.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "./pages/shared/shared.module";
import { CoreModule } from "./pages/core.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromApp from "./store/app.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/auth/auth.effect";
import { environment } from "src/environments/environment";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { RecipeEffects } from "./store/recipes/recipes-effect";
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    // StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    SharedModule,
    CoreModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
