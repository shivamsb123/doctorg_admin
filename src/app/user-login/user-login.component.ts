import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OthenticationService } from '../service/othentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  hideP = true;
  loginform!: FormGroup;
  private token;
  responcedata: any
  constructor(private authentication: OthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      userName: ['', [
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


  onSubmit() {
    if (this.loginform.valid) {
      this.authentication.userLogin(this.loginform.value).subscribe((res: any) => {
        if (res.status == 200) {
          this.responcedata = res;
          localStorage.setItem('token', this.responcedata.tokenKey)
          // localStorage.setItem('districtID', res?.userRecord?.districId);
          // localStorage.setItem('subDistrictID', res?.userRecord?.subDistricId);
          this.router.navigate(['/clinic-dashboard/'])
          this.toastr.success('Login Successfully!!');
        }
        if (res.status == 401) {
          this.toastr.error('wrong password!!');
        }
        if (res.status == 404) {
          this.toastr.error('User not found Or blocked!!');
        }
      })
    }
  }
}
