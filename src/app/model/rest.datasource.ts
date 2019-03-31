import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Product } from "./product.model";
export const REST_URL = new InjectionToken("rest_url");
@Injectable()
export class RestDataSource {
  constructor(private http: HttpClient,
    @Inject(REST_URL) private url: string) { }
  getData(): Observable<Product[]> {
    return this.sendRequest<Product[]>("GET", this.url);
  }
  saveProduct(product: Product): Observable<Product> {
    return this.sendRequest<Product>("POST", this.url, product);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.sendRequest<Product>("PUT", `${this.url}/${product.id}`, product);
  }
  deleteProduct(id: number): Observable<Product> {
    return this.sendRequest<Product>("DELETE", `${this.url}/${id}`);
  }
  private sendRequest<T>(verb: string, url: string, body?: Product): Observable<T> {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      "Access-Key": "<secret>",
      "Application-Name": "exampleApp"
    }
    );
    return this.http.request<T>(verb, url, { body: body, headers: httpHeaders }
    ).pipe(
      catchError((error: Response) => {
        let wtfUrl : string = error.url;
        let errMess:string = `catchError - Network Error: ${error.statusText} (${error.status})`
        console.log(errMess);
        return throwError(errMess)
      }   // 
      )   // end of catchErorr() function
      )   // end of pipe() function
  }
}