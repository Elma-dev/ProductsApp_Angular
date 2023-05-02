import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
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
          name:this.fb.control(null,[Validators.required,Validators.minLength(5)]),
          price:this.fb.control(null,[Validators.required]),
          promotion:this.fb.control(false)
        })
    }



  public addNewProduct(){
    //console.log(this.formGroup.value.name)
    this.productService.addNewProduct(this.formGroup.value.name,this.formGroup.value.price,this.formGroup.value.promotion).subscribe({
      next:(data)=>{
        this.router.navigateByUrl("/admin/products")
      }
    })
  }

  getErrorMsg(field: string, errors: ValidationErrors):string {
    if(errors['required']){
      return field+" is Required"
    }
    else if(errors['minlength']){
      return field+" should have at least "+errors['minlength']['requiredLength']+" Characters"
    }
    return "";
  }
}
