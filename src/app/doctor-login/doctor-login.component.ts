import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OthenticationService } from '../service/othentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {
  hideP = true;
  doctorLoginForm:any;
  responcedata:any=[];
  constructor(public fb:FormBuilder,public authentication:OthenticationService,public router:Router,public toastr:ToastrService) { }

  ngOnInit(): void {
    this.doctorLoginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.maxLength(25)
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
    })
  }
  onSubmit(){
    if (this.doctorLoginForm.valid) {
      this.authentication.doctorLogin(this.doctorLoginForm.value).subscribe((res: any) => {
        if (res.status == 200) {
          this.responcedata = res;
          localStorage.setItem('token', this.responcedata.tokenKey)
          // localStorage.setItem('districtID', res?.userRecord?.districId);
          // localStorage.setItem('subDistrictID', res?.userRecord?.subDistricId);
          this.router.navigate(['/doctor-dashboard/'])
          this.toastr.success('Login Successfully!!');
        }
        if (res.status == 401) {
          this.toastr.error('Doctor not found Or blocked!!');
        }
        if (res.status == 404) {
          this.toastr.error('Invalid Doctor!!');
        }
        if (res.status == 208) {
          this.toastr.error('Invalid Password!!');
        }
      })
    }
  }
}
