import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  formGroup!:FormGroup;
  constructor(private productService:ProductsService,private fb:FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
        this.formGroup=this.fb.group({
          name:this.fb.control(null),
          price:this.fb.control(null)
        })
    }



  public addNewProduct(){
    //console.log(this.formGroup.value.name)
    this.productService.addNewProduct(this.formGroup.value.name,this.formGroup.value.price).subscribe({
      next:(data)=>{
        this.router.navigateByUrl("/admin/products")
      }
    })
  }

}
