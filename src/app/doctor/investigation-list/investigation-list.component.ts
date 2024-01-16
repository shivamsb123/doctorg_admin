import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/service/doctor.service';
import { SuperAdminService } from '../../service/super-admin.service'
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-investigation-list',
  templateUrl: './investigation-list.component.html',
  styleUrls: ['./investigation-list.component.css']
})
export class InvestigationListComponent implements OnInit {
  status: boolean;
  authData: any;
  displayedColumns: string[] = ['id', 'investigation_name', 'action']
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  setInvestigation: any;
  investigationData: any;
  isloading:boolean=true;


  constructor(public doctorService: DoctorService, public superAdminService: SuperAdminService) {
    this.authData = superAdminService.getAuthUser();
  }

  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getInvestigation();
  }
  getInvestigation() {
    this.doctorService.getInvestigation({ id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result: any) => {
      this.isloading=false
      this.dataSource = new MatTableDataSource(result.data);
      this.dataSource.paginator = this.paginator
    })
  }

  deleteInvestigationList(data) {
    console.log(data)
    this.doctorService.deleteInvestigationById(data.id).subscribe((result: any) => {
      if (result.status === 200) {
        this.getInvestigation();
      }
    })
  }
  editInvestigation(data) {
    this.investigationData = data
    this.setInvestigation = data.investigation_name
  }
  updateInvestigationData() {
    this.doctorService.updateInvestigation({ doctor_id: this.authData.id, clinic_id: this.authData.clinic_id, investigation_name: this.setInvestigation, id: this.investigationData.id }).subscribe((result: any) => {
      if (result.status === 200) {
        this.getInvestigation();
      }

    })
  }

}
