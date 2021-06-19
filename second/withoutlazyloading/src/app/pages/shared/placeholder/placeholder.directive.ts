import { Directive, ViewContainerRef } from "@angular/core";


@Directive({

  selector: '[appPlaceholder]'
})
export class PlaceholderDirective{

  constructor(public viewContainerRef: ViewContainerRef) {

    
  }
  // give access to place where directive is used
  // like creating component at a place
}