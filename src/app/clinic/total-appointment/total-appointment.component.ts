import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClinicService } from 'src/app/service/clinic.service';
import {SuperAdminService} from '../../service/super-admin.service'
@Component({
  selector: 'app-total-appointment',
  templateUrl: './total-appointment.component.html',
  styleUrls: ['./total-appointment.component.css']
})
export class TotalAppointmentComponent {
  appointmentArr:any=[];
  displayedColumns: string[]=['id','date','doctor_name','time','name','mobile_number','email','city','nature_of_visit','action']
  dataSource = new MatTableDataSource;
  appointmentListArr:any=[];
  isActionHide:boolean=true
  authData:any;
  isloading:boolean=true;
  deleteData:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  status: boolean;
  constructor(public clinicService:ClinicService,public superAdminService:SuperAdminService){
    this.authData=this.superAdminService.getAuthUser()

  }
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(){
    this.getPendingAppointmentList();
  }
  getPendingAppointmentList(){
    let d:any=new Date().toISOString().split('T')[0]  
    this.authData.date= d;
    this.clinicService.getPendingAppointment(this.authData).subscribe((result:any)=>{
      this.isloading=false
     this.appointmentListArr=result.data;
     this.dataSource = new MatTableDataSource(this.appointmentListArr);
     this.dataSource.paginator = this.paginator;
    })
  }
  deletePendingPateint(data){
    // console.log('data',data)
    this.deleteData=data;

  }
  onPrint(divName) {
    this.isActionHide=false;
    console.log(this.isActionHide)
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}
deletePatientByid(){

  this.clinicService.deletePateintById(this.deleteData).subscribe((result:any)=>{
    if(result.status === 200){
      this.getPendingAppointmentList()
    }
  })
}
}
