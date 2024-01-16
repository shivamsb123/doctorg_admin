import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OthenticationService } from '../service/othentication.service';
import { MustMatch } from '../healpers/mustMatchValidtor'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changepassform!: FormGroup;
  user: any;
  userId = "";
  submitted:boolean=false;
  constructor(private othentication: OthenticationService, 
    private fb: FormBuilder,
    private toastr: ToastrService) { 

      this.changepassform = this.fb.group({
        currentPassword: ['', [
          Validators.required,
          Validators.minLength(6),
          // Validators.maxLength(10)
        ]],
        newPassword: ['', [
          Validators.required,
          Validators.minLength(6),
          // Validators.maxLength(10)
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
   
    this.user = this.othentication.getUser();
  }

  onSubmit() {
    this.submitted=true;
    //this.userId = this.user.id;
    // if(this.changepassform.valid)
    // {
    
      this.othentication.changePassword(this.userId,{
        currentPassword:this.changepassform?.value.currentPassword,
        newPassword:this.changepassform?.value.newPassword
      }).subscribe(res => {
             
        
              if(res.status===401){
                this.toastr.error('Invalid current password !!!');
              }
        // this.router.navigateByUrl('/dashboard');
        // this.toaster.success('Password change successfully');
        // this.othentication.patchValue({
        //   currentPassword: "",
        //   newPassword: "",
        //   confirmPassword: "",
        // });
        //this.toastr.success('password changed succesfully!!!');
        
      })
     
    // } 
                     
            
  }   

}
