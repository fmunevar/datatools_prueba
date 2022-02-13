import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CompanyComponent } from './components/company/company.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { UserComponent } from './components/user/user.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { IndexComponent } from './components/index/index.component';

import { AuthGuard } from './services/auth.guard'

const routes: Routes = [ 
  { path:'403', component: ForbiddenComponent },
  { path:'login', component: LoginComponent },
  { path:'companies', component: CompanyComponent, canActivate: [AuthGuard] },
  { path:'vehicles', component: VehicleComponent, canActivate: [AuthGuard] },
  { path:'users', component: UserComponent, canActivate: [AuthGuard] },
  { path:'', component: IndexComponent, canActivate: [AuthGuard] },
  { path:'**', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
