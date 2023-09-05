import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {FormRegistrationComponent} from "./components/form-registration/form-registration.component";
import {FormLoginComponent} from "./components/form-login/form-login.component";
import {InfoComponent} from "./components/info/info.component";
import {AuthGuardsService} from "./service/auth-guards.service";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'registration', component: FormRegistrationComponent},
  {path:'login',component:FormLoginComponent},
  {path:'info',component:InfoComponent,canActivate:[AuthGuardsService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
