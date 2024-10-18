

import { HttpClient } from "@angular/common/http";
import { inject, Inject } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "./models/Product";


Inject({
  provideIn: "root"
})
export class ProductService {
  private http = inject(HttpClient)

  products$ = new Subject<Product[]>();

  public async GetAllProducts(){
    return this.http.get<DefaultReturnAPI>("https://dummyjson.com/products").subscribe(item=> {
        this.products$.next(item.products);
    } )
  }

  GetProductsObservable(){
    return this.products$.asObservable();
  }


}

export interface DefaultReturnAPI{
  products: Product[]
}

