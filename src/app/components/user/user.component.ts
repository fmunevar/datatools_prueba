import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, FormsModule, Validators } from '@angular/forms';

import { GetDataService } from 'src/app/services/get-data.service';
import { UsersModel } from 'src/app/models/users.model';
import { DrivingModel } from 'src/app/models/driving.model';
import { EnrollmentModel } from 'src/app/models/enrollment.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  public users:Array<any> = []
  public vehicles:Array<any> = []
  public assignedVehicles:Array<any> = []
  public user_id: string = ""
  public drivingModal: any
  public modal: any
  public response: string = ""
  userData       = new UsersModel();
  drivingData    = new DrivingModel();
  enrollmentData    = new EnrollmentModel();
  closeResult       = "";

  userFormGroup = new FormGroup({
                    user_id: new FormControl(''),
                    user_id_type: new FormControl(''),
                    user_name: new FormControl(''),
                    user_lastname: new FormControl(''),
                    user_address: new FormControl(''),
                    user_zone_id: new FormControl(''),
                    user_phone: new FormControl(''),
                    // user_company_id: new FormControl(''),
                    // user_position_id: new FormControl(''),
                    // user_rol_id: new FormControl('')
                  });
  

  drivingFormGroup  = new FormGroup({
                        driving_vehicle_id: new FormControl('')
                      });

  constructor(
    private getDataService: GetDataService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.loadUsers()
    this.loadVehicles()
  }

  open(modal:any){
    this.modal = this.modalService.open(modal,{ariaLabelledBy: 'Información'})
    this.modal.result.then( (result)=>{
      this.closeResult = "Closed with: $result";
    }, (reason) =>{
      this.closeResult = "Dismissed ${this.getDismissReason(reason)}";
    } );
  }

  private getDismissReason(reason: any): string {
    if( reason === ModalDismissReasons.ESC ) {
      return 'by pressing ESC';
    }else if( reason === ModalDismissReasons.BACKDROP_CLICK ) {
      return 'by clicking on a backdrop';
    }else{
      return  `with: ${reason}`;
    }
  }

  assignVehicle(drivingModal:any, userId:any) {
    this.user_id = userId

    this.getDataService.checkAssignment(userId).subscribe((resp: any)=>{
      this.assignedVehicles=resp
    })
    
    this.drivingModal = this.modalService.open(drivingModal,{ariaLabelledBy: 'Asignar vehiculo'})
    this.drivingModal.result.then( (result)=>{
      this.closeResult = "Closed with: $result";
    }, (reason) =>{
      this.closeResult = "Dismissed ${this.getDismissReason(reason)}";
    } );
  }

  public deleteUser(confirmationModal: any, userId: any) {
    this.open(confirmationModal)
    this.user_id = userId
  }
  public submit_delete_user(modalResponse: any){
    this.getDataService.deleteUser(this.user_id).subscribe((response: any)=>{
      this.response = response.Response
      this.modal.close();
      this.open(modalResponse);
      this.loadUsers()
    });
  }

  public submit_asssign_vehicle(modalResponse: any){
    this.drivingData.user_id    = this.user_id;
    this.drivingData.vehicle_id = this.drivingFormGroup.value.driving_vehicle_id;
    
    this.getDataService.assignVehicle(this.drivingData).subscribe((response: any)=>{
      this.response = response.Response
      this.drivingModal.close();
      this.open(modalResponse);
    });
  }


  public submit(returModal: any){
    this.userData.id = this.userFormGroup.value.user_id;
    this.userData.id_type = this.userFormGroup.value.user_id_type;
    this.userData.name = this.userFormGroup.value.user_name;
    this.userData.lastname = this.userFormGroup.value.user_lastname;
    this.userData.address = this.userFormGroup.value.user_address;
    this.userData.zone_id = this.userFormGroup.value.user_zone_id;
    this.userData.phone = this.userFormGroup.value.user_phone;
    // this.userData.company_id = this.userFormGroup.value.user_company_id;
    this.userData.company_id = sessionStorage.getItem("company_id") as string;
    // this.userData.position_id = this.userFormGroup.value.user_position_id;
    this.userData.position_id = "2"; // 2 es el <cargo> parametrizado para Conductor en la BD
    // this.userData.rol_id = this.userFormGroup.value.user_rol_id;
    this.userData.rol_id = "2"; // 2 es el <rol> parametrizado para Conductor en la BD

    this.getDataService.newUser(this.userData).subscribe((response: any)=>{
      this.response = response.Response
      this.modal.close();
      this.open(returModal)
      this.loadUsers()
    });
  }

  public loadUsers(){
    this.users=[]
    this.userData.company_id = sessionStorage.getItem("company_id") as string;
    this.getDataService.getUsers(this.userData).subscribe((resp: any)=>{
      this.users=resp
    })
  }

  public loadVehicles(){
    this.enrollmentData.company_id = sessionStorage.getItem("company_id") as string;
    this.getDataService.getVehicles(this.enrollmentData).subscribe((resp: any)=>{
      let v: Array<any> = []
      resp.forEach( function(vehicle){
        console.log(vehicle.enrollment_status)
        if( vehicle.enrollment_status!=null ){
          v.push(vehicle)
        }
      } )
      
      this.vehicles=v
    })
  }

}
