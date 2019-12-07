import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from './headers.service';


@Injectable({
  providedIn: 'root'
})
export class GetsubsService {
  url: string = "http://localhost:3000/api/subcategory"
  constructor(private http: HttpClient, private header: HeadersService) { }
  getSubs() {
    return this.http.get(this.url);
  }
  getSubsById(id) {
    return this.http.get(this.url + '/' + id);
  }
  postSub(sub) {
    return this.http.post(this.url, sub, { headers: this.header.setHeader() });
  }
  updateSub(sub, id) {
    return this.http.put(this.url + '/' + id, sub, { headers: this.header.setHeader() })
  }
  removeSub(id) {
    return this.http.delete(this.url + '/' + id, { headers: this.header.setHeader() });
  }
}
