import { Component, OnInit } from '@angular/core';
import { AddUserService } from '../services/add-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private addUserService: AddUserService, private router: Router) { }

  ngOnInit() {
  }
  wrongEmail = false;
  onsubmit(user) {
    this.addUserService.addUser(user, isValid => {
      if (isValid) {
        this.router.navigate(['/']);
        return true;
      }
      else {
        this.wrongEmail = true;
      }
    })
  }

}
