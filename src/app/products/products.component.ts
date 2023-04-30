import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products! :Array<Product>;
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


  public deleteProduct(p: Product) {
    this.productsServices.deleteProduct(p.id).subscribe({
      next:(data)=>{
        let i=this.products.indexOf(p);
        this.products.splice(i,1)
      },
      error:e=>{
        this.exception=e;
      }
    })

  }

  setPromotion(id: number) {
    let p=this.products.find(p=>p.id==id);
    if(p)
      p.promotion=!(p.promotion)

  }
}
