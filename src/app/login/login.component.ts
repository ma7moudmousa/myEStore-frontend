import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private activateRout: ActivatedRoute) { }

  ngOnInit() {

  }
  isnotvalid = false;
  signIn(loginData) {
    let returnUrl = this.activateRout.snapshot.queryParamMap.get('returnUrl');
    this.auth.checkAuth(loginData, isvalid => {
      // let dest=returnUrl?returnUrl:'/'
      // this.router.navigate([dest]);
      if (isvalid) {
        let admin: any = this.auth.currentUser();
        if (admin.isadmin) {
          this.router.navigate([returnUrl || '/admin']);
          return true;
        } else {
          this.router.navigate([returnUrl || '/']);
          return true;
        }
      }
      else {
        this.isnotvalid = true;
      }
    })
  }

}
