import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, } from '@angular/forms';
import {DoctorService} from '../../service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {SuperAdminService} from '../../service/super-admin.service'
@Component({
  selector: 'app-se',
  templateUrl: './se.component.html',
  styleUrls: ['./se.component.css']
})
export class SeComponent {
  ngForm : FormGroup;
  status: boolean;
  authData:any;
  displayedColumns: string[] =['id','se_name']
  dataSource = new MatTableDataSource;

  constructor(public superAdminService:SuperAdminService,private fb:FormBuilder,public doctorService:DoctorService,public toastrService:ToastrService,public router:Router){
    this.authData=this.superAdminService.getAuthUser();
    this.ngForm= this.fb.group({
      se_name: this.fb.array([
        this.fb.control(null)
      ])
    })
  
  }
  clickEvent(){
    this.status = !this.status;
  }
  addMore(){
    (this.ngForm.get('se_name') as FormArray).push(
      this.fb.control(null)
    );
  }

  getmoreFormControls(): AbstractControl[] {
    return (<FormArray> this.ngForm.get('se_name')).controls
  }

ngOnInit() {
  // this.getSE()
}

addSeData(){
  this.doctorService.addSE({se_name:this.ngForm.value.se_name,id:this.authData.id,clinic_id:this.authData.clinic_id}).subscribe((result:any)=>{
    if(result.status === 200){
      this.ngForm.reset();
      this.toastrService.success("Successfully added","Se")
    this.router.navigate(['/se-list'])
    console.log(this.ngForm.value)
    }
  })
}


}
