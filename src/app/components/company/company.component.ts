import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { GetDataService } from 'src/app/services/get-data.service';
import { CompaniesModel } from 'src/app/models/companies.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  public companies:Array<any> = []
  public response: string = ""
  public modal: any
  
  companyData       = new CompaniesModel();
  closeResult       = "";
  /*companyFormGroup  = this.formBuilder.group({
                              company_id_type: '',
                              company_id_number: '',
                              company_name: '',
                              company_address: '',
                              company_zone_id: '',
                              company_phone: ''
                      });*/
  companyFormGroup  = new FormGroup({
                              company_id_type: new FormControl(''),
                              company_id_number: new FormControl(''),
                              company_name: new FormControl(''),
                              company_address: new FormControl(''),
                              company_zone_id: new FormControl(''),
                              company_phone: new FormControl('')
                      });

  constructor(
    private getDataService: GetDataService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.getDataService.getCompanies().subscribe((resp: any)=>{
      // console.log(resp)
      this.companies=resp
    })
  }

  open(content:any){
    this.modal = this.modalService.open(content,{ariaLabelledBy: 'Nueva empresa'})
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

  public submit(returModal: any){
      this.companyData.id_type = this.companyFormGroup.value.company_id_type;
      this.companyData.id_number = this.companyFormGroup.value.company_id_number;
      this.companyData.name = this.companyFormGroup.value.company_name;
      this.companyData.address = this.companyFormGroup.value.company_address;
      this.companyData.zone_id = this.companyFormGroup.value.company_zone_id;
      this.companyData.phone = this.companyFormGroup.value.company_phone;

      this.getDataService.newCompany(this.companyData).subscribe((response: any)=>{
        console.log(response);
        this.response = response.Response
        this.modal.close();
        this.open(returModal)
        this.loadCompanies()
      });
  }

  public loadCompanies(){
    this.companies=[]
    this.getDataService.getCompanies().subscribe((resp: any)=>{
      this.companies=resp
    })
  }

}
