import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit{
  registration_form = new FormGroup({
    name:new FormControl<string>('',Validators.required),
    email: new FormControl<string>('',Validators.required),
    birthdate: new FormControl('',Validators.required),
    password: new FormControl<string>('',Validators.required),
    checkbox: new FormControl<boolean>(true,Validators.required)
  })

  constructor(private userService:UserService,private router:Router) {

  }
a:string
  submit(){
    console.log(this.registration_form.value)
    this.a = this.registration_form.value.birthdate as string
    const [year, month, day] = this.a.split('-');
    console.log({
      'name':this.registration_form.value.name as string,
      'email':this.registration_form.value.email as string,
      'password':this.registration_form.value.password as string,
      'notification': this.registration_form.value.checkbox as boolean,
      'BirthInfo':{
        'year': Number(year) as number,
        'month': Number(month) as number,
        'day':Number(day) as number
      }
    })

    this.userService.register({
      name: this.registration_form.value.name as string,
      email: this.registration_form.value.email as string,
      password: this.registration_form.value.password as string,
      notifications: this.registration_form.value.checkbox as boolean,
      birthInfo:{
        year: Number(year) as number,
        month: Number(month) as number,
        day:Number(day) as number
      }
    }).subscribe(value => {
        this.router.navigate(['/login'])
      },
      error => {
      console.log(error)
      })
  }
  getDay(date:string):number{
    const dateNew = new Date(date)
    return dateNew.getDay()
  }
  getMonth(date:string):number{
    const dateNew = new Date(date)
    return dateNew.getMonth()+1
  }
  getYear(date:string):number{
    const dateNew = new Date(date)
    return dateNew.getFullYear()
  }
  ngOnInit(): void {
  }
}
