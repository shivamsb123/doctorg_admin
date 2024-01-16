import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClinicService } from 'src/app/service/clinic.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-total-doctor',
  templateUrl: './total-doctor.component.html',
  styleUrls: ['./total-doctor.component.css']
})
export class TotalDoctorComponent {
  doctorListArr:any=[];
  displayedColumns: string[] = ['clinic_id','doctor_name','fees', 'total_amount','today_amount','mobile_number','professional_bio','action'];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  authData: any;
  isloading:boolean=true;

  constructor(public clinicService:ClinicService,public superAdminService:SuperAdminService){
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
}
