import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class GetcategoryService {
  url: string = "http://localhost:3000/api/category";
  constructor(private http: HttpClient, private header: HeadersService) { }
  getCategory() {
    return this.http.get(this.url);
  }
  getCategoryById(id) {
    return this.http.get(this.url + '/' + id);
  }
  postCategory(category) {
    return this.http.post(this.url, category, { headers: this.header.setHeader() })
  }
  updatecate(id, category) {
    return this.http.put(this.url + '/' + id, category, { headers: this.header.setHeader() });
  }
  removecate(id) {
    return this.http.delete(this.url + '/' + id, { headers: this.header.setHeader() });
  }
}
