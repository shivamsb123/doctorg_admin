import {
  AfterViewInit,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SuperAdminService} from '../service/super-admin.service'
export interface UserData {}
@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.css'],
})
export class NewDashboardComponent implements AfterViewInit {
  clinicArr:any=[];
  deleteData:any;
  displayedColumns: string[] = ['clinic_name','clinic_registration_no','clinic_owner_name', 'clinic_mobile_number','clinic_phone_number','email','password','clinic_area','clinic_city','clinic_state','clinic_pin_code','Action'];
  // , 'clinic_registration_no','clinic_owner_name', 'clinic_mobile_number','clinic_phone_number', 'clinic_close_time','clinic_open_time','clinic_area','clinic_city','clinic_state','clinic_pin_code'
  dataSource = new MatTableDataSource;
  isloading:boolean=true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public superAdminService:SuperAdminService) {
    this.getClinicData();
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    // console.log('',this.dataSource)
  }
  
  ngAfterViewInit() {
    //  this.createChart();
    // this.dataSource.paginator = this.paginator;
  }
 getClinicData(){
  this.superAdminService.getClinicAllData().subscribe((result:any)=>{
    this.isloading=false;
    // console.log(result.data);
    this.clinicArr=result.data;
    this.dataSource = new MatTableDataSource(this.clinicArr);
    this.dataSource.paginator = this.paginator
  })
 }
 activeStatus(status,event){
  var active_status;
   if(event.checked){
    active_status=1
   }else{
    active_status=0;
   }
  this.superAdminService.updateActiveStatus({active_status : active_status,id : status.id}).subscribe((result:any)=>{
    console.log(result);
  })
 }
 deleteClinic(data){
  // console.log(data);
  this.deleteData=data;
 
 }
 deleteClinicByid(){
  this.superAdminService.deleteClinicById({id : this.deleteData.id}).subscribe(result =>{
    if(result.status == 200){
      this.getClinicData();
    }
 })
 }
}
