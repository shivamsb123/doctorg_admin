import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {DoctorService} from '../../service/doctor.service'
@Component({
  selector: 'app-all-doctor-list',
  templateUrl: './all-doctor-list.component.html',
  styleUrls: ['./all-doctor-list.component.css']
})
export class AllDoctorListComponent implements OnInit {
  displayedColumns: string[] = ['clinic_id','doctor_name','fees', 'total_amount','today_amount','mobile_number','professional_bio'];
  dataSource = new MatTableDataSource;
  isloading:boolean=true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  doctorListArr: any=[];

  constructor(public doctorService:DoctorService) { }
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getDoctorList();
  }
getDoctorList(){
  this.doctorService.getAllDoctorList().subscribe((result=>{
    this.isloading=false;
    this.doctorListArr = result.data;
    this.dataSource = new MatTableDataSource(this.doctorListArr);
     this.dataSource.paginator = this.paginator;
  }))
}
}
