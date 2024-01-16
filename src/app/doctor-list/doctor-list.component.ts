import { Component, OnInit, ViewChild } from '@angular/core';
import {ClinicService} from '../service/clinic.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SuperAdminService } from '../service/super-admin.service';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctorListArr:any=[];
  displayedColumns: string[] = ['clinic_id','doctor_name','doctor_speciality','specialised_treatment','industry_experience','professional_bio','action'];
  dataSource = new MatTableDataSource;
  deleteData:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  authData: any;
  isloading:boolean=true;

  constructor(public clinicService:ClinicService,public superAdminService:SuperAdminService) {
    this.authData=this.superAdminService.getAuthUser()

   }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getAllDoctorData();
  }
getAllDoctorData(){
  this.clinicService.getDoctor(this.authData).subscribe((result:any)=>{
    this.isloading=false
   this.doctorListArr=result.data;
   this.dataSource = new MatTableDataSource(this.doctorListArr);
   this.dataSource.paginator = this.paginator;
  })
}
deleteDoctor(data){
  // console.log(data);
  this.deleteData=data;
}
deleteDoctorByid(){
 this.clinicService.deleteDoctorById(this.deleteData).subscribe((result:any) =>{
   this.getAllDoctorData();
  })
}
updateDoctorData(data){
this.clinicService.updateDoctor({active_status:data.active_status == 1 ? 0:1,id:data.id}).subscribe((result:any)=>{
  // console.log(result)
})
}
}
