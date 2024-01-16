import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../../service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service'
@Component({
  selector: 'app-enter-disease',
  templateUrl: './enter-disease.component.html',
  styleUrls: ['./enter-disease.component.css']
})
export class EnterDiseaseComponent {
  ngForm: FormGroup;
  status: boolean;
  authData: any;
  displayedColumns: string[] = ['id', 'disease_name']
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public superAdminService: SuperAdminService, private fb: FormBuilder, public doctorService: DoctorService, public toastrService: ToastrService, public router: Router) {
    this.authData = this.superAdminService.getAuthUser()
    this.ngForm = this.fb.group({
      disease_name: this.fb.array([
        this.fb.control(null)
      ])
    })

  }
  clickEvent() {
    this.status = !this.status;
  }
  addMore() {
    (this.ngForm.get('disease_name') as FormArray).push(
      this.fb.control(null)
    );
  }

  getmoreFormControls(): AbstractControl[] {
    return (<FormArray>this.ngForm.get('disease_name')).controls
  }

  ngOnInit() {
    // this.getDisease();

  }

  addDiseaseData() {
    this.doctorService.addDesease({ disease_name: this.ngForm.value.disease_name, id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result: any) => {
      if (result.status === 200) {
        this.ngForm.reset();
        this.toastrService.success("Successfully added", "Disease")
        this.router.navigate(['/disease-list'])
      }
    })
  }
}
