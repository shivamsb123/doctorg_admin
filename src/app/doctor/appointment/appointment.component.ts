import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/service/appointment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {  Router } from '@angular/router';
import { SuperAdminService } from 'src/app/service/super-admin.service';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{

appointmentArr:any=[];
displayedColumns: string[]=['id','date','time','name','mobile_number','email','city','nature_of_visit','action']
dataSource = new MatTableDataSource;
deleteData:any;
@ViewChild(MatPaginator) paginator: MatPaginator;

  status: any;
  authData: any;
  isloading:boolean=true;

  constructor(private appointment:AppointmentService,public router:Router,public superAdminService:SuperAdminService) { 
    this.authData=this.superAdminService.getAuthUser()

   this.getAppointMentData();
  }
  clickEvent() {
    this.status = !this.status;
  }
  getAppointMentData(){
    let d:any=new Date().toISOString().split('T')[0]  
    this.authData.date= d;
    this.appointment.getAppointMent(this.authData).subscribe((result:any)=>{
      this.isloading=false
      this.appointmentArr = result.data;
      console.log(result)
      this.dataSource = new MatTableDataSource(this.appointmentArr);
      this.dataSource.paginator = this.paginator
    })
  }
  sendComplete(data){
    this.appointment.sendCompleteAppointment(data).subscribe((result:any)=>{
      if(result.status == 200){
        this.appointment.todayEarning(data).subscribe((result:any)=>{
          this.router.navigate(['/complete-appointment-list'])
        })
      }
    })
  }

  ngOnInit(): void {
  }
  deleteAppointment(data){
    this.deleteData=data
  }
  deleteAppointmentyid(){
    this.appointment.deleteAppointmentById(this.deleteData.id).subscribe((result:any)=>{
      if(result.status == 200){
        this.getAppointMentData();
      }
     })
  }
}
