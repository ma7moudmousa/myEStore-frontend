import { Component, OnInit } from '@angular/core';
import { GetcategoryService } from '../services/getcategory.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[];
  changed: boolean = false;
  changed1: boolean = false;
  already: boolean = false;
  cant: boolean = false;
  cateid: any;
  index: any;
  constructor(private category: GetcategoryService, private user: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.category.getCategory().subscribe(response => {
      this.categories = (response as any);
    })
  }
  change() {
    this.changed = !this.changed;
  }
  changedfun1() {
    this.changed1 = !this.changed1
  }
  alreadyfun() {
    this.already = !this.already
  }
  cantfun() {
    this.cant = !this.cant;
  }
  id(cateid) {
    this.cateid = cateid._id;
    this.index = this.categories.indexOf(cateid);
    window.scrollTo(0, 0);
  }
  editfun(category) {
    this.category.updatecate(this.cateid, category).subscribe(updated => {
      if ((updated as any).name) {
        this.categories.splice(this.index, 1, updated);
        this.changedfun1();
      } else {
        this.changedfun1();
        this.alreadyfun();
      }
    });


  }
  removefun(category) {
    window.scrollTo(0, 0);
    this.index = this.categories.indexOf(category);
    this.category.removecate(category._id).subscribe(removed => {
      if ((removed as any).name) {
        this.categories.splice(this.index, 1)
      }
      else {
        this.cantfun();
      }
    })

  }
  add(category) {
    this.category.postCategory(category).subscribe(response => {
      if ((response as any).name) {
        (this.categories as string[]).unshift((response as any));
        this.change();
      } else {
        this.change();
        this.alreadyfun();
      }
    });

  }
}
