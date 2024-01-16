import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {SuperAdminService} from '../../service/super-admin.service';
import {DoctorService} from '../../service/doctor.service'
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  status:boolean
  authData:any;
  isloading:boolean=true;
  displayedColumns: string[] =['sr','disease', 'medicine_name','medicine_content','timing','action']
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  setMedicine:any;
  medicineData:any;

  constructor(public superAdminService:SuperAdminService,public doctorService:DoctorService) { 
    this.authData=this.superAdminService.getAuthUser();
  }
  clickEvent(){
    this.status !=this.status
  }

  ngOnInit(): void {
    this.getMedicineData();
  }
getMedicineData(){
  this.doctorService.getMedicine({id:this.authData.id,clinic_id:this.authData.clinic_id}).subscribe((result:any)=>{
    this.isloading=false
    this.dataSource = new MatTableDataSource(result.data);
    this.dataSource.paginator = this.paginator
  })
}
deleteMedicineList(data){
  this.doctorService.deleteMedicineById(data.id).subscribe((result:any)=>{
    if(result.status === 200){
      this.getMedicineData();
    }
  })
}
editMedicine(data){
this.medicineData =data
this.setMedicine=data.medicine_name
}
updateMedicineData(){
this.doctorService.updateMedicine({doctor_id:this.authData.id,clinic_id:this.authData.clinic_id,medicine_name:this.setMedicine,id:this.medicineData.id}).subscribe((result:any)=>{
  if(result.status === 200){
    this.getMedicineData();
  }
})
}

}
