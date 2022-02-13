import { Component } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { GetDataService } from 'src/app/services/get-data.service';
import { VehiclesModel } from 'src/app/models/vehicles.model';
import { EnrollmentModel } from 'src/app/models/enrollment.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {

  public vehicles:Array<any> = []
  public vehicle_id: string = ""
  public enrollModal: any
  public date = new Date()
  public enrollment_status = ""
  public modal: any
  public response: string = ""
  
  vehicleData       = new VehiclesModel();
  enrollmentData    = new EnrollmentModel();
  closeResult       = "";
  vehicleFormGroup  = new FormGroup({
                              vehicle_plate: new FormControl(''),
                              vehicle_engine: new FormControl(''),
                              vehicle_chassis: new FormControl(''),
                              vehicle_model: new FormControl(''),
                              vehicle_registration_date: new FormControl(''),
                              vehicle_seated_passengers: new FormControl(''),
                              vehicle_standing_passengers: new FormControl(''),
                              vehicle_gross_weight: new FormControl(''),
                              vehicle_net_weight: new FormControl(''),
                              vehicle_doors: new FormControl(''),
                              vehicle_brand: new FormControl(''),
                              vehicle_lineup: new FormControl('')
                      });

  constructor(
    private getDataService: GetDataService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe
  ) {
    this.enrollmentData.company_id = sessionStorage.getItem('company_id') as string;
    this.getDataService.getVehicles(this.enrollmentData).subscribe((resp: any)=>{
      console.log(resp);
      this.vehicles=resp
    })
  }

  open(content:any){
    this.modal = this.modalService.open(content,{ariaLabelledBy: 'Nuevo vehiculo'})
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


  public submit(returnModal: any){
    this.vehicleData.plate = this.vehicleFormGroup.value.vehicle_plate;
    this.vehicleData.engine = this.vehicleFormGroup.value.vehicle_engine;
    this.vehicleData.chassis = this.vehicleFormGroup.value.vehicle_chassis;
    this.vehicleData.model = this.vehicleFormGroup.value.vehicle_model;
    this.vehicleData.registration_date = this.vehicleFormGroup.value.vehicle_registration_date;
    this.vehicleData.seated_passengers = this.vehicleFormGroup.value.vehicle_seated_passengers;
    this.vehicleData.standing_passengers = this.vehicleFormGroup.value.vehicle_standing_passengers;
    this.vehicleData.gross_weight = this.vehicleFormGroup.value.vehicle_gross_weight;
    this.vehicleData.net_weight = this.vehicleFormGroup.value.vehicle_net_weight;
    this.vehicleData.doors = this.vehicleFormGroup.value.vehicle_doors;
    this.vehicleData.brand = this.vehicleFormGroup.value.vehicle_brand;
    this.vehicleData.lineup = this.vehicleFormGroup.value.vehicle_lineup;

    this.getDataService.newVehicle(this.vehicleData).subscribe((response: any)=>{
        console.log(response);
        this.response = response.Response
        this.modal.close();
        this.open(returnModal)
        this.loadVehicles()
      });
  }


  public disenrollVehicle(enrollModal: any, vehiclePlate: any){
    this.sendEnrollVehicle(enrollModal, vehiclePlate, "disenroll");

  }

  public enrollVehicle(enrollModal: any, vehiclePlate: any){
    this.sendEnrollVehicle(enrollModal, vehiclePlate, "enroll");
  }

  public sendEnrollVehicle(enrollModal: any, vehiclePlate: any, type: string){
    console.log("Enrolling vehicle...");
    let company_id = "";
    if( sessionStorage.getItem('company_id')!=null ){
      company_id = sessionStorage.getItem('company_id') as string;
    }

    this.enrollmentData.company_id = company_id;
    this.enrollmentData.vehicle_plate = vehiclePlate;
    this.enrollmentData.type = type;
    this.enrollmentData.date = this.datepipe.transform(this.date,'yyyy-MM-dd') as string;

    this.getDataService.enrollVehicle(this.enrollmentData).subscribe( (response: any) => {
      this.enrollment_status = response.Response
      this.open(enrollModal)
    } );
  }

  public submit_enroll_vehicle(){
    console.log('submit_enroll_vehicle');
  }

  public loadVehicles(){
    this.vehicles=[]
    this.getDataService.getVehicles(this.enrollmentData).subscribe((resp: any)=>{
      this.vehicles=resp
      this.modal.close();
    })
  }

}
