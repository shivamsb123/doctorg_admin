import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, } from '@angular/forms';
import { DoctorService } from 'src/app/service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {SuperAdminService} from '../../service/super-admin.service'

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent {
  ngForm : FormGroup;
  status: boolean;
  diagnosis_name:any;
  diagnosisArr : any=[];
  authData:any;


constructor(private fb:FormBuilder,private diagnosis:DoctorService,public toastrService:ToastrService,public router:Router,public superAdminService:SuperAdminService){
  // console.log(this.superAdminService.getAuthUser())
  this.authData=this.superAdminService.getAuthUser()
  this.ngForm= this.fb.group({
    diagnosis_name: this.fb.array([
      this.fb.control(null)
    ])
  })

}

addDiagnosisData(){
  this.diagnosis.addDiagnosis({diagnosis_name:this.ngForm.value.diagnosis_name,id:this.authData.id,clinic_id:this.authData.clinic_id}).subscribe((result:any)=>{
    console.log("API response", result)
    if(result.status === 200){
      // next api call get list
      this.ngForm.reset();
      this.toastrService.success("Successfully added","Diagnosis")
      this.router.navigate(['/diagnosis-list'])
    }
  })
}


  clickEvent(){
    this.status = !this.status;
  }
  addMore(){
      (this.ngForm.get('diagnosis_name') as FormArray).push(
        this.fb.control(null)
      );
    }

    getmoreFormControls(): AbstractControl[] {
      return (<FormArray> this.ngForm.get('diagnosis_name')).controls
    }
  
  ngOnInit() {
    // this.getDiagnosisData()
  }

}
