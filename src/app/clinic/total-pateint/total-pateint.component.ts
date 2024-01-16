import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from 'src/app/service/appointment.service';
import { ClinicService } from 'src/app/service/clinic.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-total-pateint',
  templateUrl: './total-pateint.component.html',
  styleUrls: ['./total-pateint.component.css']
})
export class TotalPateintComponent {
  appointmentArr:any=[];
displayedColumns: string[]=['id','date','time','name','mobile_number','email','city','nature_of_visit']
dataSource = new MatTableDataSource;
isloading:boolean=true;


@ViewChild(MatPaginator) paginator: MatPaginator;
status: boolean;
  pateintArr: any=[];
  authData: any;
constructor(private appointment:AppointmentService,public superAdminService:SuperAdminService,public clinicService:ClinicService){
  this.authData=this.superAdminService.getAuthUser()

}
clickEvent() {
  this.status = !this.status;
}
getPateintListByClinicId(){
  this.clinicService.getPatientByClinicId(this.authData).subscribe((result:any)=>{
    this.isloading=false
    this.appointmentArr = result.data;
    console.log(result)
    this.dataSource = new MatTableDataSource(this.appointmentArr);
    this.dataSource.paginator = this.paginator
  })
}
ngOnInit(): void {
  this.getPateintListByClinicId();
}

}
