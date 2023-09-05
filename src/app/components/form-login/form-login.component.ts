import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Params,ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit{
  user_: User
  login_form = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  })

  constructor(private userService: UserService, private router: Router,private route:ActivatedRoute) {
  }

  submit() {
    console.log(this.userService.isAuthenticated())
    this.userService.login(this.login_form.value.email as string,this.login_form.value.password as string).subscribe(value=>{
      this.router.navigate(['/info'])},error => {
      console.log(error.value)
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=> {
      if(params['registered']){
        //теперь вы можете зайти в систему используя свои данные
      } else if(params['accessDenied']){
        //для начала авторизуйтесь в систему
      }
    })
  }
}

