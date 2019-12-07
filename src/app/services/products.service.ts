import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = "http://localhost:3000/api/product"
  constructor(private http: HttpClient, private header: HeadersService) { }
  getProducts() {
    return this.http.get(this.url);
  }
  getProduct(id) {
    return this.http.get(this.url + "/" + id);
  }
  postProd(prod) {
    return this.http.post(this.url, prod, { headers: this.header.setHeader() });
  }
  updateProd(prod, id) {
    return this.http.put(this.url + '/' + id, prod, { headers: this.header.setHeader() })
  }
  removeProd(id) {
    return this.http.delete(this.url + '/' + id, { headers: this.header.setHeader() });
  }
}
