import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DoctorService} from '../../service/doctor.service'
@Component({
  selector: 'app-total-aapointment-list',
  templateUrl: './total-aapointment-list.component.html',
  styleUrls: ['./total-aapointment-list.component.css']
})
export class TotalAapointmentListComponent implements OnInit {
  displayedColumns: string[]=['clinic_id','doctor_id','name','mobile_number','email','city'];
dataSource = new MatTableDataSource;
isloading:boolean=true;

@ViewChild(MatPaginator) paginator: MatPaginator;

  status: any;
  appointmentArr: any=[];

  constructor(public doctorService:DoctorService) { }
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getAllDoctorAppointmnet()
  }
getAllDoctorAppointmnet(){
  this.doctorService.getAllAppointment().subscribe((result:any)=>{
    this.isloading=false
    console.log(result);
    this.appointmentArr = result.data
    this.dataSource = new MatTableDataSource(this.appointmentArr);
     this.dataSource.paginator = this.paginator;
  })
}
}
