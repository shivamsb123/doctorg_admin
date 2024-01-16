import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from 'protractor';
import { DoctorService } from 'src/app/service/doctor.service';
import { SuperAdminService } from '../../service/super-admin.service'
@Component({
  selector: 'app-diagnosis-list',
  templateUrl: './diagnosis-list.component.html',
  styleUrls: ['./diagnosis-list.component.css']
})
export class DiagnosisListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'diagnosis_name', 'action']
  dataSource = new MatTableDataSource;
  authData: any;
  complaintArr: any = [];
  setDiagnosis: any
  diagnosisData: any;
  isloading:boolean=true;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

  status: boolean;
  iterator: any;
  constructor(public superAdminService: SuperAdminService, public doctorService: DoctorService) {
    this.authData = this.superAdminService.getAuthUser()
  }

  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getDiagnosisData();
  }
  getDiagnosisData() {
    this.doctorService.getDiagnosis({ id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result: any) => {
      this.isloading=false
      if (result.status === 200) {
        // this.diagnosisArr = result.data
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator
      }
    })
  }

  deleteDiagnosisList(data) {
    console.log(data)
    this.doctorService.deleteDiagnosisById(data.id).subscribe((result: any) => {
      if (result.status === 200) {
        this.getDiagnosisData();
      }
    })
  }
  editDiagnosis(data) {
    this.diagnosisData = data
    this.setDiagnosis = data.diagnosis_name
  }
  updateDiagnosisData() {
    this.doctorService.updateDiagnosis({ doctor_id: this.authData.id, clinic_id: this.authData.clinic_id, diagnosis_name: this.setDiagnosis, id: this.diagnosisData.id }).subscribe((result: any) => {
      if (result.status === 200) {
        this.getDiagnosisData();
      }
    })
  }
  ngAfterViewInit(){
  
  }
  
}
