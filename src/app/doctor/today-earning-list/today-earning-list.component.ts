import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuperAdminService } from 'src/app/service/super-admin.service';
import {DoctorService} from '../../service/doctor.service'
@Component({
  selector: 'app-today-earning-list',
  templateUrl: './today-earning-list.component.html',
  styleUrls: ['./today-earning-list.component.css']
})
export class TodayEarningListComponent implements OnInit {
  displayedColumns: string[]=['id','date','time','name','mobile_number','email','city','nature_of_visit']
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  status: any;
  todayArr:any=[];
  authData: any;
  isloading:boolean=true;
  constructor(public doctorService:DoctorService,public superAdminService:SuperAdminService) { 
    this.authData=this.superAdminService.getAuthUser()

  }

  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getTodayEarningData()
  }
getTodayEarningData(){
  this.doctorService.getTodayEarningList(this.authData).subscribe((result:any)=>{
    this.isloading=false
   this.todayArr=result.data;
   this.dataSource = new MatTableDataSource(this.todayArr);
      this.dataSource.paginator = this.paginator
  })
}

}
