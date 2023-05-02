import { Injectable } from '@angular/core';
import {UserAppModel} from "../models/userApp.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationsService {
  appUsers: UserAppModel[]=[];
  authenticatUser:UserAppModel|undefined;

  constructor() {
    this.appUsers.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["ADMIN","USER"]});
    this.appUsers.push({userId:UUID.UUID(),username:"user2",password:"1234",roles:["USER"]});
    this.appUsers.push({userId:UUID.UUID(),username:"admin",password:"admin",roles:["ADMIN"]});
  }

  public login(username:string,password:string):Observable<UserAppModel>{
    let userAppModel = this.appUsers.find(user=>user.username=username);
    if(userAppModel==undefined){
      return throwError(()=>new Error("this user doesn't exist"));
    }
    if(userAppModel.password!=password){
      return throwError(()=>new Error("password incorrect"));
    }
    return of(userAppModel);
  }
  public authenticat(user:UserAppModel):Observable<boolean>{
    this.authenticatUser=user;
    localStorage.setItem("user",JSON.stringify({username:user.username,roles:user.roles,jwt:"JWT Athentification"}))
    return of(true)
  }
  public hasRole(role:string):Observable<boolean>{
    return of(this.authenticatUser!.roles.includes(role));
  }
  public isAuthenticat():Observable<boolean>{
    return of(this.authenticatUser!=undefined);
  }
}
