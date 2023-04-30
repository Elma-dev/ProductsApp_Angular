import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products! : Array<Product>;
  constructor() {
    this.products=[
      {id:1,name:"Computer",price:12332},
      {id:2,name:"Printer",price:4330},
      {id:3,name:"Smart Phone",price:8233}
    ]
  }

  public get AllProduct():Observable<Array<Product>>{
    if(Math.random()<0.5) return throwError(()=>new Error("Connexion Error"));
    return of(this.products);
  }

  public deleteProduct(id:number):Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }
}
