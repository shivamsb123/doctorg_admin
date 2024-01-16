import { Component, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, Form, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/service/doctor.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-test-master',
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.css']
})
export class TestMasterComponent {
  displayedColumns: string[] = ['id', 'test_name', 'price']
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  status: any;
  authData: any;
  ngForm: any;
  testArr: any = [];
  isloading:boolean=true;

  constructor(public doctorService: DoctorService, public superAdminService: SuperAdminService) {
    this.authData = this.superAdminService.getAuthUser()
  }
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit() {
    this.ngForm = new FormGroup({
      test_name: new FormControl(''),
      price: new FormControl('')
    })
    this.getTest();
  }
  submitForm(data) {
    data.id = this.authData.id
    data.clinic_id = this.authData.clinic_id
    this.doctorService.addTest(data).subscribe((result: any) => {
      if (result.status === 200) {
        this.getTest();
        this.ngForm.reset();
      }
    })
  }
  getTest() {
    this.doctorService.getAllTest().subscribe((result: any) => {
      this.isloading=false
      this.testArr = result.data
      this.dataSource = new MatTableDataSource(this.testArr);
      this.dataSource.paginator = this.paginator
    })
  }
}
