import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products! :Array<any>;
  exception!:string;
  constructor(private productsServices:ProductsService) {
  }

  ngOnInit(): void {
    this.productsServices.AllProduct.subscribe({
      next:(data)=>{
        this.products=data;
      },
      error:(exceptionError)=>{
        this.exception=exceptionError;
      }
    })
  }


  public deleteProduct(p: any) {
    let i=this.products.indexOf(p);
    this.products.splice(i,1)
  }
}
