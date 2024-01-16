import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/service/doctor.service';
import {SuperAdminService} from '../../service/super-admin.service'

@Component({
  selector: 'app-enter-disease-list',
  templateUrl: './enter-disease-list.component.html',
  styleUrls: ['./enter-disease-list.component.css']
})
export class EnterDiseaseListComponent implements OnInit {
  status: boolean;
  authData:any;
  displayedColumns: string[] =['id','disease_name','action']
  dataSource = new MatTableDataSource;
  setDisease: any;
  diseaseData: any;
  isloading:boolean=true;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public doctorService:DoctorService,public superAdminService:SuperAdminService) { 
    this.authData=this.superAdminService.getAuthUser()
  }
  clickEvent(){
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getDisease();
  }
  getDisease(){
    this.doctorService.getDesease({id:this.authData.id,clinic_id:this.authData.clinic_id}).subscribe((result:any)=>{
      this.isloading=false
      if(result.status === 200){
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator
      }
    })
  }
 deleteDiseaseList(data){
  console.log(data)
  this.doctorService.deleteDiseaseById(data.id).subscribe((result:any)=>{
    if(result.status === 200){
      this.getDisease();
    }
  })
 }
 editDisease(data){
  this.diseaseData =data
  this.setDisease =data.disease_name
}

updateDiseaseData(){
    this.doctorService.updateDisease({doctor_id:this.authData.id,clinic_id:this.authData.clinic_id,disease_name:this.setDisease,id:this.diseaseData.id}).subscribe((result:any)=>{
   if(result.status === 200){
    this.getDisease();
  }
 
 })
   }
}



