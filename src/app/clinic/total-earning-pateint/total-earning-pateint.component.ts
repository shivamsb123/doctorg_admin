import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-total-earning-pateint',
  templateUrl: './total-earning-pateint.component.html',
  styleUrls: ['./total-earning-pateint.component.css']
})
export class TotalEarningPateintComponent {
  displayedColumns: string[] = ['clinic_id','doctor_name','name','mobile_number','city'];
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  status: any;
  appointmentListArr: any;
  queryParamsData:any;
  constructor(private appointment:AppointmentService,public superAdminService:SuperAdminService,public route:ActivatedRoute){
    // this.authData=this.superAdminService.getAuthUser()
    this.route.queryParams.subscribe(params => {
      this.queryParamsData=params;
      // console.log(params)
  });
  }
  clickEvent() {
    this.status = !this.status;
  }
getTotalEarningDoctor(){
  this.appointment.getAllCompleteAppointment({id:this.queryParamsData.doctor_id}).subscribe((result:any)=>{
    this.appointmentListArr = result.data
    this.dataSource = new MatTableDataSource(this.appointmentListArr);
    this.dataSource.paginator = this.paginator
  })
}
ngOnInit(): void {
  this.getTotalEarningDoctor()
}

}
