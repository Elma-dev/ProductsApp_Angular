import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product} from "../models/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products! :Array<Product>;
  exception! :string;
  formGroup! :FormGroup;
  size:number=7;
  page:number=0;
  nbrTotalPages!:number;
  listPageNbr !:Array<number>;
  searchInAll:boolean=false;
  constructor(private productsServices:ProductsService,private formBuilder:FormBuilder) {
    this.formGroup=this.formBuilder.group({
      keyword:this.formBuilder.control(null)
    })
  }

  ngOnInit(): void {
    this.productsServices.getPageProduct(this.page,this.size).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.nbrTotalPages=data.totalNbrPage;
        this.listPageNbr=Array(this.nbrTotalPages).fill(1).map((val,i)=>i);
        console.log(this.listPageNbr);
      },
      error:(exceptionError)=>{
        this.exception=exceptionError;
      }
    })
  }

  public allProducts():void{
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

  setPromotion(p: Product) {
    let promo = p.promotion;
    this.productsServices.setPromotion(p.id).subscribe({
        next:(data)=>{
          p.promotion = !(promo);
        },
        error:(e)=>{
          this.exception=e;
        }
      })


  }

  searchProduct() {
    this.productsServices.searchProducts(this.formGroup.value.keyword,this.page,this.size).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.nbrTotalPages=data.totalNbrPage;
        this.listPageNbr=Array(this.nbrTotalPages).fill(1).map((v,k)=>k)
        this.searchInAll=true;
      },
      error:(err)=>{
        this.exception=err;
      }
    })
  }

  changePage(i: number) {
    this.page=i;
    if(this.searchInAll==false)
      this.productsServices.getPageProduct(this.page,this.size).subscribe({
        next:(data)=>{
          this.products=data.products;

        },
        error:(exceptionError)=>{
          this.exception=exceptionError;
        }
      })
    else
      this.searchProduct()
  }
}
