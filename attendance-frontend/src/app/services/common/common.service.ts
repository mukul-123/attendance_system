import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";

import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  Api_url: string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) {}

  objectToString(obj: Object) {
    var str = "";
    for (var key in obj) {
      str += key +"=" + obj[key]+"&";
    }
    return str;
  }

  postRequest(data: object, path): Observable<any> {
    return this.http.post(this.Api_url + path, data);
  }

  getRequest(url: string): Observable<any> {
    return this.http.get(this.Api_url + url);
  }

  getRequestWithParameters(url: string, param: object): Observable<any> {
    return this.http.get(this.Api_url + url + "?" + this.objectToString(param));
  }
}
