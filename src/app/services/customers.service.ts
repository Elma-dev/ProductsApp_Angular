import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Customer, CustomerPages} from "../models/customer.model";
import {Product} from "../models/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private customers!:Array<Customer>;

  constructor() {
    this.customers=[
      {id:UUID.UUID(),name:'Customer1',age:18},
      {id:UUID.UUID(),name:'Customer2',age:18},
      {id:UUID.UUID(),name:'Customer3',age:18},
      {id:UUID.UUID(),name:'Customer4',age:18},
      {id:UUID.UUID(),name:'Customer5',age:18},
    ]

    for(let i=0;i<50;i++){
      this.customers.push({id:UUID.UUID(),name:'Customer'+(i+6),age:18+i})
    }
  }

  public allCustomers():Observable<Array<Customer>>{
    if(Math.random()<0.5) return throwError(()=>new Error("Connexion Error"));
    return of(this.customers);
  }

  public deleteCustomer(id:string):Observable<boolean>{
    this.customers=this.customers.filter(c=>c.id!=id);
    return of(true);
  }
  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return of(this.customers.filter(c=>c.name.includes(keyword)));
  }

  public getCustomerPage(page:number,size:number):Observable<CustomerPages>{
    let nbrTotalePages=~~(this.customers.length/size);
    nbrTotalePages=this.customers.length%size==0?nbrTotalePages:nbrTotalePages+1;
    let customerPage=this.customers.slice(page*size,page*size+size);
    return of({customerPage:customerPage,page:page,size:size,totalNbrPages:nbrTotalePages})
  }

}
