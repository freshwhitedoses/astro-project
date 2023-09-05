import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user";
import {Observable, take, tap} from "rxjs";
import {Prediction} from "../models/prediction";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  prediction: Prediction
  user: User
  private sign: string |null

  constructor(private http:HttpClient,private router:Router, private rout:ActivatedRoute) { }

  register(user: User):Observable<User>{
    return this.http.post<User>("http://localhost:8086/api/v1/users/add", user)
  }
  login(email:string, password:string):Observable<User>{
    return this.http.post<User>("http://localhost:8086/api/v1/users/login?email="+email+"&password="+password,{params:new HttpParams()})
      .pipe(tap(user=>{
        this.user=user
        localStorage.setItem('sign',user.sign as string)
        this.setEmail(user.sign as string)
      }))
  }
  setEmail(phone:string|null) {
    this.sign = phone
  }
    getEmail():string{
      return this.sign as string
    }
  isAuthenticated():boolean{
    return !!this.sign
  }
  logout(){
    this.setEmail(null)
    localStorage.clear()
  }
  getPrediction(sign:string):Observable<Prediction>{
    return this.http.get<Prediction>("http://localhost:8086/api/v1/astro/getPrediction?Sign="+sign+"&Day=today",{params:new HttpParams()})
      .pipe(tap(pred=>this.prediction=pred))

  }

}
