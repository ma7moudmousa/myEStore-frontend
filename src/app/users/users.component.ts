import { Component, OnInit } from '@angular/core';
import { AddUserService } from '../services/add-user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers: any[];
  user: any;
  index: any;
  changed: boolean = false;
  constructor(private userService: AddUserService, private userAuth: AuthService) { }
  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      this.allUsers = (response as any);
    })
  }
  values(user) {
    window.scrollTo(0, 0);
    this.user = user
    this.index = this.allUsers.indexOf(user);
  }
  changedfun1() {
    this.changed = !this.changed;
  }
  edite(user) {
    this.userService.updateUser(this.user._id, user).subscribe(response => {
      this.allUsers.splice(this.index, 1, response)
    })
    this.changedfun1();
  }
  removefun(user) {
    window.scrollTo(0, 0);
    this.index = this.allUsers.indexOf(user);
    this.userService.removeUser(user._id).subscribe()
    this.allUsers.splice(this.index, 1);
  }

}
