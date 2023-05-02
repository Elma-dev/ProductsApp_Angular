import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../services/customers.service";
import {Customer} from "../models/customer.model";
import {Product} from "../models/product.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers! :Array<Customer>;
  error!:string;
  formGroup!:FormGroup;
  size:number=7;
  page:number=0;
  totalNbrPage!:number;
  pageIndex!:Array<number>;


  constructor(private customerServices:CustomersService,private formBuilder:FormBuilder){
    this.formGroup=formBuilder.group({
      keyword:this.formBuilder.control(null)
    })
  }

  ngOnInit(): void {
    this.getCustomerPage(this.page,this.size);
  }

  public getCustomerPage(page:number,size:number):void{
    this.customerServices.getCustomerPage(page,size).subscribe({
      next:(data)=>{
        this.customers=data.customerPage;
        this.totalNbrPage=data.totalNbrPages;
        this.pageIndex=Array(this.totalNbrPage).fill(1).map((v,k)=>k);

      },
      error:(err)=>{
        this.error=err;
      }
    })
  }

  public getAllCustomer():Array<Customer>{
    this.customerServices.allCustomers().subscribe({
      next:(data)=>{
        this.customers=data
      },
      error:(errorException)=>{
        this.error=errorException;
      }
    })
    return this.customers;
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

  public searchCustomer() {
    this.customerServices.searchCustomers(this.formGroup.value.keyword,this.page,this.size).subscribe({
      next:(data)=>{
        this.customers=data.customerPage;
        this.totalNbrPage=data.totalNbrPages;
        this.pageIndex=Array(this.totalNbrPage).fill(1).map((v,k)=>k)
      },
      error:(err)=>this.error=err
    })

  }

  changePage(i: number) {
    this.page=i;
    this.getCustomerPage(i,this.size);
  }
}
