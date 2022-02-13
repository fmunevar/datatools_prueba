import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8080/prueba_datatools/webapi/';

  constructor( private http: HttpClient ) { }

  /**
   * Función que llama la API de inicio de sesión
   * */
  login(username:string, password:string ) {
    let hashed = true;
    return this.http.post(this.baseUrl+'login', {username, password, hashed})
  }

}
