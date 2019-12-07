import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetsubsService } from '../services/getsubs.service';
import { AuthService } from '../services/auth.service';
import { AddUserService } from '../services/add-user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  ids: any;
  oneproduct: any;
  products: any[];
  sub: any;
  btnValue: any = "Buy";
  constructor(private user: AuthService, private productService: ProductsService,
    private route: ActivatedRoute, private router: Router,
    private subService: GetsubsService, private getUSer: AddUserService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.ids = params.get("ids");
      this.productService.getProduct(this.id).subscribe(product => {
        this.oneproduct = product
        this.oneproduct.ids = this.ids;
      })
    })
    this.productService.getProducts().subscribe(allproducts => {
      this.products = (allproducts as any);
    })
    this.subService.getSubsById(this.ids).subscribe(response => {
      this.sub = response;
    })
  }
  setFun() {
    this.btnValue = "Buy";
    window.scrollTo(0, 0);
  }
  buyFun() {
    if (this.user.islogedIn()) {
      this.btnValue = "Done";
    } else {
      this.router.navigate(['/login']);
    }
  }

}
