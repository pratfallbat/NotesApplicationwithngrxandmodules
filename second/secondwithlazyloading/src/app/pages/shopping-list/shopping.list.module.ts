// import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    // CommonModule,
    // we can comment above aas we are using it from shared module
    SharedModule,
    FormsModule,
    RouterModule.forChild([
    { path: '', component: ShoppingListComponent }
    ])
  ]

})
export class ShoppingListModule{

}