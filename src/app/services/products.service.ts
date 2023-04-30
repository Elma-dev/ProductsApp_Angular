import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../models/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products! : Array<Product>;
  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"Computer",price:12332,promotion:false},
      {id:UUID.UUID(),name:"Printer",price:4330,promotion:false},
      {id:UUID.UUID(),name:"Smart Phone",price:8233,promotion:false}
    ]

    for(let i=0;i<50;i++){
      this.products.push(
        {id:UUID.UUID(),name:"Computer",price:12332,promotion:false},
        {id:UUID.UUID(),name:"Printer",price:4330,promotion:false},
        {id:UUID.UUID(),name:"Smart Phone",price:8233,promotion:false}
      )
    }
  }

  public get AllProduct():Observable<Array<Product>>{
    if(Math.random()<0.5) return throwError(()=>new Error("Connexion Error"));
    return of(this.products);
  }

  public getPageProduct(page:number,size:number):Observable<PageProduct>{
    let nbr=~~(this.products.length/size);
    let totalPages=this.products.length%size==0?nbr:nbr+1;
    let pageProduct=this.products.slice(page*size,page*size+size)

    return of({products:pageProduct,page:page,size:size,totalNbrPage:totalPages})

  }
  public deleteProduct(id:string):Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }

  public setPromotion(id:string):Observable<boolean>{
    let product = this.products.find(p=>p.id==id);
    if(product) {
      product.promotion = !(product.promotion)
      return of(true);
    }
    return throwError(()=>new Error("Operation it's not affected!"))
  }

  public searchProducts(keyword:string,page:number,size:number):Observable<PageProduct>{
    let results=this.products.filter(p=>p.name.includes(keyword));
    let nbr=~~(results.length/size);
    let totalPages=results.length%size==0?nbr:nbr+1;
    let pageProduct=results.slice(page*size,page*size+size)
    return of({products:pageProduct,page:page,size:size,totalNbrPage:totalPages})
  }
}
