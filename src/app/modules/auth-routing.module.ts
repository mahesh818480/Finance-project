import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';


const routes: Routes = [

  // DEFAULT → LOGIN PAGE
  {
    path: '',
    component: LoginComponent
  },

   {
    path: 'login',
    component: LoginComponent
  },

  // REGISTER PAGE
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path:'forget',
    component: ForgotPasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}