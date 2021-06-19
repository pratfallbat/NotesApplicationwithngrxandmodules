import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :  boolean | Promise<boolean| UrlTree> | Observable<boolean |UrlTree>{

    // return this.authService.user.pipe(map(user => {
    //   return !!user;
    // })
    //   , tap(isAuth => {
    //   if (!isAuth) {
    //     this.router.navigate(['/auth'])
    //   }
    // })
    
    // );
// old way and versions


    return this.authService.user.pipe(
      take(1),
      map(user => {

      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    })
    
    );
    
}
}