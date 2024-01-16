import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from 'src/app/service/appointment.service';
import { SuperAdminService } from '../../service/super-admin.service';


@Component({
  selector: 'app-complete-appointment-list',
  templateUrl: './complete-appointment-list.component.html',
  styleUrls: ['./complete-appointment-list.component.css']
})
export class CompleteAppointmentListComponent implements OnInit {

  displayedColumns: string[]=['id','date','time','name','mobile_number','email','city','nature_of_visit','action']
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  status: any;
  appointmentListArr: any=[];
  authData: any;
  isloading:boolean=true;

  constructor(private appointment:AppointmentService,public superAdminService:SuperAdminService) {
    this.authData=this.superAdminService.getAuthUser()

   this.getCompleteAppointment()
   }
  
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
  }
  getCompleteAppointment(){
    this.appointment.getAllCompleteAppointment(this.authData).subscribe((result:any)=>{
      this.isloading=false
      this.appointmentListArr = result.data
      this.dataSource = new MatTableDataSource(this.appointmentListArr);
      this.dataSource.paginator = this.paginator
    })
  }

}
