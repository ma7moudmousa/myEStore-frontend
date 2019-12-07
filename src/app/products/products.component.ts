import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { GetsubsService } from '../services/getsubs.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[];
  product: any;
  subCategories: any[];
  id: string;
  changed1: boolean = false;
  changed: boolean = false;
  already: boolean = false;
  fileData: File = null;
  previewUrl: any = null;
  // pproducts: any[] = [];
  index: any;
  constructor(
    private router: ActivatedRoute, private Subs: GetsubsService,
    private productService: ProductsService, private user: AuthService) { }

  ngOnInit() {

    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.productService.getProducts().subscribe(response => {
      this.products = (response as any)
    })
    this.Subs.getSubs().subscribe(response => {
      this.subCategories = (response as any)
    })
  }
  changedfun1() {
    this.changed1 = !this.changed1;
  }
  change() {
    this.changed = !this.changed;
  }
  alreadyfun() {
    this.already = !this.already
  }
  values(product) {
    window.scrollTo(0, 0);
    this.product = product
    this.index = this.products.indexOf(product);
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  create(product) {

    product.image = this.previewUrl
    this.productService.postProd(product).subscribe(response => {
      if ((response as any).new) {
        this.product = {
          image: (response as any).new.image,
          name: (response as any).new.name,
          price: (response as any).new.price,
          desc: (response as any).new.desc,
          rating: (response as any).new.rating,
          _id: (response as any).new._id,
          subcategory: {
            name: (response as any).sub.name,
            _id: (response as any).sub._id,
            category: (response as any).sub.category._id
          }
        }
        this.products.unshift(this.product);
        this.change();
      } else {
        this.change();
        this.alreadyfun();
      }
    }
    )
  }
  edit(product) {
    if (!product.image) {
      product.image = this.product.image
    } else {
      product.image = this.previewUrl
    }
    this.productService.updateProd(product, this.product._id).subscribe(response => {
      if ((response as any).new) {
        this.product = {
          image: (response as any).new.image,
          name: (response as any).new.name,
          price: (response as any).new.price,
          desc: (response as any).new.desc,
          rating: (response as any).new.rating,
          _id: (response as any).new._id,
          subcategory: {
            name: (response as any).sub.name,
            _id: (response as any).sub._id,
            category: (response as any).sub.category._id
          }
        }
        this.products.splice(this.index, 1, this.product);
        this.changedfun1();
      } else {
        this.changedfun1();
        this.alreadyfun();
      }
    })
  }//search
  // onkeyup(query) {
  //   this.pproducts = this.products;
  //   this.products = (query) ?
  //     this.pproducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
  //     this.pproducts

  // }
  removefun(product) {
    window.scrollTo(0, 0);
    this.index = this.products.indexOf(product);
    this.productService.removeProd(product._id).subscribe();
    this.products.splice(this.index, 1)
  }

}
