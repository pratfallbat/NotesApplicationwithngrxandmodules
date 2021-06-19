import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  closeSubscription: Subscription;


  constructor(private authService : AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  
  onSubmit(form: NgForm) {
   
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      
    } else {
      
authObs=      this.authService.signup(email, password);
    
    }
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorRes => {
        console.log(errorRes);
        this.error = errorRes;
        this.showErrorAlert(errorRes)
        this.isLoading = false;
      }
    )
    form.reset() ;  

  }



 
  ngOnInit() {
  }
  onHandleError() {
    this.error = null;
  }
  showErrorAlert(message:string) {
    // const alert = new AlertComponent();
    // cant create component like this properly
    // so use compo factory
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef=hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
      
    })

  }
  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
      console.log('abdsd  ')
    }
  }
}
