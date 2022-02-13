import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginStatus = false;

  public redirectUrl = '';

  public return: string = '';


  /*loginFormGroup  = this.formBuilder.group({
                        username: '',
                        password: ''
                });*/

  loginFormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => this.return=params['return'] || '/companies')
  }

  login(){
    if (this.loginFormGroup.value.username && this.loginFormGroup.value.password) {
      let username = this.loginFormGroup.value.username;
      let password = Base64.stringify(sha256(this.loginFormGroup.value.password));
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);

      console.log('Calling checkSession');

      this.checkSession(username, password).then(data => {
        this.router.navigate(['/']);
      });
      

      /*this.authService.login(this.loginFormGroup.value.username, this.loginFormGroup.value.password).subscribe((response: any) => {
            console.log(response);
            this.loginStatus = response.Response;
            
            if( response.Response=="true" ){
              console.log('Guardando en LS');
              let permission = response.Permission;
              if( permission.length>=1 ){
                permission.forEach( function (value){
                  
                } );
              }
              // localStorage.setItem('userStatus', "true");
              // this.router.navigate([this.return]);
            }
        }
      );*/
    }
  }

  async isLogged(): Promise<any> {
    console.log('Verificando...');
    if( sessionStorage.getItem('username')!=null && sessionStorage.getItem('password')!=null){
      return new Promise(resolve => {
        resolve (this.checkSession(sessionStorage.getItem('username'), sessionStorage.getItem('password')))
      });
    }else{
      return false;
    }

    /*var userStatus = localStorage.getItem('userStatus');
    if( userStatus=="true" ){
      return true;
    }
    return this.loginStatus;*/
  }

  public setRedirectUrl(url: string){
    this.redirectUrl = url;
  }

  checkSession(username: any, password: any): Promise<string> {
    console.log('in checkSession');
    return new Promise( resolve => {
      this.authService.login(username,password).subscribe( (res: any) => {
        resolve(res);
      } );

    } );

      

      /*this.authService.login(username, password).subscribe((response: any) => {
        let permissionsArray: Array<string> = [];
        console.log(response);
        this.loginStatus = response.Response;
        // this.router.navigate(['/companies']);
        if( response.Response=="true" ){
          let permission = response.Permission;
          if( permission.length>=1 ){
            permission.forEach( function (value){
              permissionsArray.push(value.page)
            } );
            console.log(permissionsArray);
          }
          // localStorage.setItem('userStatus', "true");
          // this.router.navigate([this.return]);
        }
      } );*/
    
  }

}
