import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, private afAuth : AngularFireAuth){}
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return new Promise((resolve,reject)=>{
        this.afAuth.onAuthStateChanged((user)=>{
          if(user){
            resolve(true);
          }else{
            console.log('AuthGuard: usser is not loged in');
            this.router.navigate(['/home']);
            resolve(false);
          }
        });
      });
  }
  
}
