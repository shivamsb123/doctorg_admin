import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../../service/doctor.service';
import { SuperAdminService } from '../../service/super-admin.service'
@Component({
  selector: 'app-chief-complaint-list',
  templateUrl: './chief-complaint-list.component.html',
  styleUrls: ['./chief-complaint-list.component.css']
})
export class ChiefComplaintListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'chief_complaint_name', 'action']
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  authData: any;
  setChief: any;
  chiefComplainData: any;

  constructor(public doctorService: DoctorService, public superAdminService: SuperAdminService) {
    this.authData = this.superAdminService.getAuthUser();
  }
  status: boolean;
  isloading:boolean=true;

  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getAllComplaint();
  }

  getAllComplaint() {
    this.doctorService.getAllChief({ id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result: any) => {
      this.isloading=false
      // console.log(result)
      this.dataSource = new MatTableDataSource(result.data);
      this.dataSource.paginator = this.paginator
    })
  }

  deleteComplainList(data) {
    console.log(data)
    this.doctorService.deleteChiefById(data.id).subscribe((result: any) => {
      if (result.status === 200) {
        this.getAllComplaint();
      }
    })
  }

  editChief(data) {
    this.chiefComplainData = data
    this.setChief = data.chief_complaint_name
  }
  updateChiefData() {
    this.doctorService.updateChiefComplaint({ doctor_id: this.authData.id, clinic_id: this.authData.clinic_id, chief_complaint_name: this.setChief, id: this.chiefComplainData.id }).subscribe((result: any) => {
      if (result.status === 200) {
        this.getAllComplaint();
      }

    })
  }
}
