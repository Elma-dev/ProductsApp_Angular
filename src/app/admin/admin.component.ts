import { Component } from '@angular/core';
import {AuthentificationsService} from "../services/authentifications.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(public authenticatUser:AuthentificationsService,private router:Router) {
  }

  logout(){
    this.authenticatUser.logout();
    this.router.navigateByUrl("/login")
  }
}
