import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginComponent } from '../components/login/login.component';
import { HeaderComponent } from '../components/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public loginStatus;
  public text: string = "TASFASFDF"
  constructor( 
    private router: Router, 
    private loginComponent: LoginComponent,
    private headerComponent: HeaderComponent
  ){ }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {


    console.log('Checking...');
    return new Promise<boolean>( resolve=>{
      this.loginComponent.isLogged().then(data=>{
        console.log(data);

        if( data==false || data.Return=="false" ) {
          console.log("No ha iniciado sesión");
          this.router.navigate(['/login'])
          resolve(false);
        }else{
          console.log("YA ha iniciado sesión");
          console.log(state.url);
          
          sessionStorage.setItem('company_id', data.company_id);
          
          var permission = data.Permission;
          let permissionsArray: Array<string> = [];
          if( permission.length>=1 ){
            permissionsArray.push("/");
            permission.forEach( function (value){
              permissionsArray.push("/"+value.page)
            })
            console.log(permissionsArray);
            sessionStorage.setItem("menu", JSON.stringify(permissionsArray))
            if( permissionsArray.includes(state.url) ){
              resolve(true);
            }else{
              this.router.navigate(['/403'])
              resolve(false);
            }
          }else{
            this.router.navigate(['/403'])
            resolve(false); 
          }

        }
      })
      
    } );
  }
  
}
