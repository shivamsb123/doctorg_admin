import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {DoctorService} from '../../service/doctor.service';
import {SuperAdminService} from '../../service/super-admin.service'
@Component({
  selector: 'app-se-list',
  templateUrl: './se-list.component.html',
  styleUrls: ['./se-list.component.css']
})
export class SeListComponent implements OnInit {

  status: boolean;
  authData:any;
  displayedColumns: string[] =['id','se_name','action']
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  setSe:any;
  Sedata: any;
  isloading:boolean=true;


  constructor(public doctorService:DoctorService,public superAdminService:SuperAdminService) { 
    this.authData=this.superAdminService.getAuthUser();
  }
  clickEvent(){
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getSE();
  }

  getSE(){
    this.doctorService.getSEData({id:this.authData.id,clinic_id:this.authData.clinic_id}).subscribe((result:any)=>{
      this.isloading=false
      this.dataSource = new MatTableDataSource(result.data);
      this.dataSource.paginator = this.paginator
    })
  }
  deleteSeList(data){
    console.log(data)
    this.doctorService.deleteSeById(data.id).subscribe((result:any)=>{
      if(result.status === 200){
        this.getSE();
      }
    })
  }
  editSe(data){ 
    this.Sedata = data
    this.setSe=data.se_name
  }
  updateSeData(){
   this.doctorService.updateSe({doctor_id:this.authData.id,clinic_id:this.authData.clinic_id,se_name:this.setSe,id:this.Sedata.id}).subscribe((result:any)=>{
  if(result.status === 200){
    this.getSE();
  }

})
  }
  
}
