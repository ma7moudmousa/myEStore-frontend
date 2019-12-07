import { Component, OnInit } from '@angular/core';
import { GetsubsService } from '../services/getsubs.service';
import { AuthService } from '../services/auth.service';
import { GetcategoryService } from '../services/getcategory.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  subCates: any[];
  subcate: any;
  changed: boolean = false;
  changed1: boolean = false;
  already: boolean = false;
  cant: boolean = false;
  categories: any[];
  setValues: any;
  index: any;
  constructor(private subs: GetsubsService, private user: AuthService, private getAllCates: GetcategoryService) { }

  ngOnInit() {
    //get all subs
    this.subs.getSubs().subscribe(response => {
      this.subCates = (response as any);
    })
    //get all categories
    this.getAllCates.getCategory().subscribe(response => {
      this.categories = (response as any);
    })
  }
  //fun help to display forms
  change() {
    this.changed = !this.changed;
  }
  changedfun1() {
    this.changed1 = !this.changed1;
  }
  alreadyfun() {
    this.already = !this.already
  }
  cantfun() {
    this.cant = !this.cant;
  }
  // creat new sub
  create(sub) {
    this.subs.postSub(sub).subscribe(response => {
      if ((response as any).new) {
        this.subcate = {
          name: (response as any).new.name,
          _id: (response as any).new._id,
          category: {
            name: (response as any).category.name,
            _id: (response as any).category._id
          }
        }
        this.subCates.unshift(this.subcate);
        this.change();
      } else {
        this.change();
        this.alreadyfun();
      }
    })
  }
  values(subcate) {
    this.subcate = subcate
    this.index = this.subCates.indexOf(subcate);
    window.scrollTo(0, 0);
  }
  edit(subcate) {
    this.subs.updateSub(subcate, this.subcate._id).subscribe(response => {
      if ((response as any).update) {
        this.subcate = {
          name: (response as any).update.name,
          _id: (response as any).update._id,
          category: {
            name: (response as any).category.name,
            _id: (response as any).category._id
          }
        }
        this.subCates.splice(this.index, 1, this.subcate);
        this.changedfun1();
      } else {
        this.changedfun1();
        this.alreadyfun();
      }

    })
  }
  removefun(subcate) {
    window.scrollTo(0, 0);
    this.index = this.subCates.indexOf(subcate);
    this.subs.removeSub(subcate._id).subscribe(response => {
      if ((response as any).name) {
        this.subCates.splice(this.index, 1)
      } else {
        this.cantfun();
      }
    });

  }
}
