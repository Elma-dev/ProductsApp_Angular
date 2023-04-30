import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../services/customers.service";
import {Customer} from "../models/customer.model";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers! :Array<Customer>;
  error!:string;

  constructor(private customerServices:CustomersService){
  }

  ngOnInit(): void {
    this.customerServices.allCustomers().subscribe({
      next:(data)=>{
        this.customers=data
      },
      error:(errorException)=>{
        this.error=errorException;
      }
    })

  }


  public deleteCustomer(c: Customer) {
    this.customerServices.deleteCustomer(c.id).subscribe({
      next:(data)=>{
        this.customers.splice(this.customers.indexOf(c),1);
      },
      error:(e)=>{
        this.error=e;
      }
    })
  }
}
