import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  baseUrl = 'http://localhost:8080/prueba_datatools/webapi/';

  constructor(private http: HttpClient) {
    console.log("Mi primer servicio")
  }

  /* ********** Companies ********** */
  public getCompanies(){
    return this.http.get(this.baseUrl+"company/companies");
  }

  public newCompany(companyData: any){
    return this.http.post(this.baseUrl+"company/new", companyData);
  }


  /* ********** Vehicles ********** */
  public getVehicles(vehicleData: any){
    return this.http.post(this.baseUrl+"vehicle/vehicles", vehicleData);
  }

  public newVehicle(vehicleData: any){
    return this.http.post(this.baseUrl+"vehicle/new", vehicleData);
  }

  public enrollVehicle(vehicleData: any){
    return this.http.post(this.baseUrl+"vehicle/enroll", vehicleData);
  }


  /* ********** Users ********** */
  public getUsers(userData: any){
    return this.http.post(this.baseUrl+"user/users", userData);
  }

  public newUser(userData: any){
    return this.http.post(this.baseUrl+"user/new", userData);
  }

  public deleteUser(userId: any){
    return this.http.delete(this.baseUrl+"user/"+userId);
  }

  public assignVehicle(drivingData: any){
    return this.http.post(this.baseUrl+"user/vehicle_assignment", drivingData);
  }

  public checkAssignment(userId: any){
    return this.http.get(this.baseUrl+"user/check_assignments/"+userId);
  }
}
