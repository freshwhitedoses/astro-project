import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Prediction} from "../../models/prediction";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit{
  sign:string
  details1=false
  details2=false
  details3=false
  details4=false
  details5=false
  constructor(public userService:UserService,private router:Router) {
  }
  prediction_: Prediction
  ngOnInit(): void {
    this.sign = localStorage.getItem('sign') as string
    this.userService.getPrediction(this.sign as string).subscribe((next) => {this.prediction_=next;
      console.log(next)})
  }

  logout() {
    this.userService.logout()
    this.router.navigate(['/'])
  }
}
