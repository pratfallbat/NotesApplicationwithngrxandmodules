import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthService } from "./pages/auth/auth.service";
import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./store/auth/auth.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.auth.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
