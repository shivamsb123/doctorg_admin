import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MustMatch} from '../healpers/mustMatchValidtor'
import { OthenticationService } from '../service/othentication.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  getparamid: any
  editForm!: FormGroup;
  id!: string;

  changepassform!: FormGroup;
  user: any;
  userId = "";
  submitted: boolean = false;

  hideP = true;
  hideCP = true;

  constructor(private othentication: OthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService
    )
     {
   
      this.editForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        mobileNo: new FormControl('', Validators.required),  
      })

      this.changepassform = this.fb.group({
        currentPassword: ['', [
          Validators.required,
          Validators.minLength(6),
           Validators.maxLength(10)
        ]],
        newPassword: ['', [
          Validators.required,
          Validators.minLength(6),
           Validators.maxLength(10)
        ]],
        confirmPassword: ["", [Validators.required]]
      },
        {
          validators: MustMatch('newPassword', 'confirmPassword'),
        }
      ) 
         
    

     }
      
     get f() {
      return this.changepassform.controls;
    }
      
  ngOnInit(): void {
    
    this.getparamid = this.activatedRouter.snapshot.paramMap.get('id');
    this.othentication.getProfile().subscribe(res=>{
      this.editForm.patchValue({
           firstName: res.data?.firstName,
           lastName: res.data?.lastName,
           email: res.data?.email,
           mobileNo: res.data?.mobileNo,
      })  
    })
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.othentication.updateprofile(this.getparamid,this.editForm.value).subscribe(res => {
        this.toastr.success('profile update Successfully!!');
        this.router.navigate(['/dashboard'])
      })
    }

 }


 changePassword(){
  this.submitted = true;
            
}

}
