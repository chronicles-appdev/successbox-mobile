import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if (localStorage.getItem('userId')) {



            this.router.navigate(['/tabs/home']);
            // Retrieve date from local storage
            const storedDate = localStorage.getItem('expiry_date');


            if (!storedDate) {
              console.log('DateGuard: stored date is null or empty.');
              return false;
            }
                // Convert storedDate to a Date object
               // const parsedStoredDate = new Date(storedDate);

            // Get current date
            const currentDate = new Date();

            // Compare dates
            // if (parsedStoredDate < currentDate) {
            //   console.log('DateGuard: stored date is in the past.');
            //   this.router.navigate(['/expire']);
            // } else {
            //   console.log('DateGuard: stored date is valid.');

            // }





      }else{
       return true
      }

    return false;
  }

}
