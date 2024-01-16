import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, } from '@angular/forms';
import {DoctorService} from '../../service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {SuperAdminService} from '../../service/super-admin.service'
@Component({
  selector: 'app-chief-complaint',
  templateUrl: './chief-complaint.component.html',
  styleUrls: ['./chief-complaint.component.css']
})
export class ChiefComplaintComponent {
  ngForm : FormGroup;
  status: boolean;
  displayedColumns: string[] =['id','chief_complaint_name']
  dataSource = new MatTableDataSource;
  authData:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public superAdminService:SuperAdminService,private fb:FormBuilder,public doctorService:DoctorService,public toastrService:ToastrService,public router:Router){
       this.authData=this.superAdminService.getAuthUser();
    this.ngForm= this.fb.group({
      chief_complaint_name: this.fb.array([
        this.fb.control(null)
      ])
    })
  
  }
  clickEvent(){
    this.status = !this.status;
  }
  addMore(){
    (this.ngForm.get('chief_complaint_name') as FormArray).push(
      this.fb.control(null)
    );
  }

  getmoreFormControls(): AbstractControl[] {
    return (<FormArray> this.ngForm.get('chief_complaint_name')).controls
  }

ngOnInit() {
  // this.getAllComplaint();
}
  
addDiagnosisData(){
  this.doctorService.addchiefComplaint({chief_complaint_name:this.ngForm.value.chief_complaint_name,id:this.authData.id,clinic_id:this.authData.clinic_id}).subscribe((result:any)=>{
    if(result.status === 200){
      this.ngForm.reset();
      this.router.navigate(['/chief-complaint-list'])
      this.toastrService.success("Successfully added","Chief Complaint")
    }
  })
  
}
}
