import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdmingardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route, state) {
    if (this.auth.currentUser().isadmin) {
      return true;
    } else {
      this.router.navigate(['/noaccess'])
      return false;
    }
  }


}
