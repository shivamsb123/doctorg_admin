import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, } from '@angular/forms';
import {DoctorService} from '../../service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {SuperAdminService} from '../../service/super-admin.service'
@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.css']
})
export class InvestigationComponent {
  ngForm : FormGroup;
  status: boolean;
  authData:any;
  displayedColumns: string[] =['id','investigation_name']
  dataSource = new MatTableDataSource;

constructor(public superAdminService:SuperAdminService,private fb:FormBuilder,public doctorService:DoctorService,public toastrService:ToastrService,public router:Router){
    this.authData=this.superAdminService.getAuthUser()
  this.ngForm= this.fb.group({
    investigation_name: this.fb.array([
      this.fb.control(null)
    ])
  })

}

  clickEvent(){
    this.status = !this.status;
  }
  addMore(){
      (this.ngForm.get('investigation_name') as FormArray).push(
        this.fb.control(null)
      );
    }

    getmoreFormControls(): AbstractControl[] {
      return (<FormArray> this.ngForm.get('investigation_name')).controls
    }
  
  ngOnInit() {
    // this.getInvestigation();
  }

  addinvestigationData(){
  this.doctorService.addinvestigation({investigation_name:this.ngForm.value.investigation_name,id:this.authData.id,clinic_id:this.authData.clinic_id}).subscribe((result:any)=>{
    // console.log("API response", result)
    if(result.status === 200){
      this.ngForm.reset();
      this.toastrService.success("Successfully added","Investigation")
       this.router.navigate(['/investigation-list'])
    }
  })
}

}
