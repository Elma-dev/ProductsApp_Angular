import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {ProductsComponent} from "./products/products.component";
import {AuthentificationsComponent} from "./authentifications/authentifications.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NewProductComponent} from "./new-product/new-product.component";

const routes: Routes = [
  {path:"admin",component:AdminComponent,canActivate:[AuthenticationGuard],children:[
      {path:"customers",component:CustomersComponent},
      {path:"products",component:ProductsComponent},
      {path:"newProduct",component:NewProductComponent}
    ]},
  {path:"login",component:AuthentificationsComponent},
  {path:"",component:AuthentificationsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
