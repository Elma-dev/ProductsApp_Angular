import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products! : Array<any>;
  constructor() {
    this.products=[
      {id:1,name:"Computer",price:12332},
      {id:2,name:"Printer",price:4330},
      {id:3,name:"Smart Phone",price:8233}
    ]
  }

  public get AllProduct():Observable<Array<any>>{
    if(Math.random()<0.5) return throwError(()=>new Error("Connexion Error"));
    return of(this.products);
  }
}
