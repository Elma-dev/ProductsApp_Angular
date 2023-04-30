import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Customer} from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private customers!:Array<Customer>;

  constructor() {
    this.customers=[
      {id:1,name:'Customer1',age:18},
      {id:2,name:'Customer2',age:18},
      {id:3,name:'Customer3',age:18},
      {id:4,name:'Customer4',age:18},
      {id:5,name:'Customer5',age:18},
    ]
  }

  public allCustomers():Observable<Array<Customer>>{
    if(Math.random()<0.5) return throwError(()=>new Error("Connexion Error"));
    return of(this.customers);
  }

}
