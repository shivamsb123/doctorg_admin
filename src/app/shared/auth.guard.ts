import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OthenticationService } from '../service/othentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private othentication: OthenticationService,
    private router: Router) {
     
  }

  canActivate() {
    if (this.othentication.isLogesIn()) {
      return true;
    }
    else {
      this.router.navigate(['/'])
      return false;
    }
  }


}
