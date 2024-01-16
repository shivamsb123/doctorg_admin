import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../service/super-admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import {environment} from '../../environments/environment'
@Component({
  selector: 'app-create-clinic',
  templateUrl: './create-clinic.component.html',
  styleUrls: ['./create-clinic.component.css']
})
export class CreateClinicComponent implements OnInit {
  imageUrl=environment.url + "images/";
  images:any=[];
  createClinicForm: any;
  editClinicArr:any=[]
  clicnicId:any;
  fileToUpload: File | null = null;
  constructor(public superAdminService: SuperAdminService, public toastrService: ToastrService,
    private router: Router,public activatedRoute:ActivatedRoute) { 
      this.activatedRoute.params.subscribe((params: any) => {
        this.clicnicId=params;
     })
    }

    status: boolean = false;
    clickEvent() {
      this.status = !this.status;
    }
  ngOnInit(): void {
    this.getClinicData()
    this.createClinicForm = new FormGroup({
      clinic_name: new FormControl("", [Validators.required]),
      clinic_registration_no: new FormControl("", [Validators.required]),
      clinic_owner_name: new FormControl("", [Validators.required]),
      clinic_mobile_number: new FormControl("", [Validators.required]),
      clinic_phone_number: new FormControl("", [Validators.required]),
      clinic_open_time: new FormControl("", [Validators.required]),
      clinic_close_time: new FormControl("", [Validators.required]),
      clinic_logo: new FormControl("", [Validators.required]),
      clinic_pin_code: new FormControl("", [Validators.required]),
      clinic_area: new FormControl("", [Validators.required]),
      clinic_city: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      clinic_state: new FormControl("", [Validators.required]),
    })
    if(this.clicnicId.id){
      this.createClinicForm.get('clinic_logo').clearValidators();
      this.createClinicForm.updateValueAndValidity();
    }
  }
  onSubmit() {
    if (!this.createClinicForm.valid) {
      this.createClinicForm.markAllAsTouched();
    }
    if(this.clicnicId.id){
         console.log('update')
         const formData = new FormData();
         if(this.fileToUpload !=undefined)
         formData.append('clinic_logo', this.fileToUpload);
         formData.append('id', this.clicnicId.id);
         formData.append('clinic_name', this.createClinicForm.value.clinic_name);
         formData.append('clinic_registration_no', this.createClinicForm.value.clinic_registration_no);
         formData.append('clinic_owner_name', this.createClinicForm.value.clinic_owner_name);
         formData.append('clinic_mobile_number', this.createClinicForm.value.clinic_mobile_number);
         formData.append('clinic_phone_number', this.createClinicForm.value.clinic_phone_number);
         formData.append('clinic_close_time', this.createClinicForm.value.clinic_close_time);
         formData.append('clinic_open_time', this.createClinicForm.value.clinic_open_time);
         formData.append('clinic_pin_code', this.createClinicForm.value.clinic_pin_code);
         formData.append('clinic_area', this.createClinicForm.value.clinic_area);
         formData.append('clinic_city', this.createClinicForm.value.clinic_city);
         formData.append('clinic_state', this.createClinicForm.value.clinic_state);
         formData.append('email', this.createClinicForm.value.email);
         formData.append('password', this.createClinicForm.value.password);
         this.superAdminService.updateClinic(formData).subscribe(result =>{
          this.router.navigate(['/clinic-list'])
         })
    }else{
      if (this.createClinicForm.valid) {
        // console.log(this.createClinicForm.value.clinic_name)
        const formData = new FormData();
        formData.append('clinic_logo', this.fileToUpload);
        formData.append('clinic_name', this.createClinicForm.value.clinic_name);
        formData.append('clinic_registration_no', this.createClinicForm.value.clinic_registration_no);
        formData.append('clinic_owner_name', this.createClinicForm.value.clinic_owner_name);
        formData.append('clinic_mobile_number', this.createClinicForm.value.clinic_mobile_number);
        formData.append('clinic_phone_number', this.createClinicForm.value.clinic_phone_number);
        formData.append('clinic_close_time', this.createClinicForm.value.clinic_close_time);
        formData.append('clinic_open_time', this.createClinicForm.value.clinic_open_time);
        formData.append('clinic_pin_code', this.createClinicForm.value.clinic_pin_code);
        formData.append('clinic_area', this.createClinicForm.value.clinic_area);
        formData.append('clinic_city', this.createClinicForm.value.clinic_city);
        formData.append('clinic_state', this.createClinicForm.value.clinic_state);
        formData.append('email', this.createClinicForm.value.email);
        formData.append('password', this.createClinicForm.value.password);
        this.superAdminService.createClinic(formData).subscribe(result => {
          if (result.status == 200) {
            this.router.navigate(['/clinic-list'])
            this.toastrService.success('Create clinic Successfully!!');
          }
        })
      }
    }
  
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  getClinicData(){
    this.superAdminService.getClinicById({id:this.clicnicId.id}).subscribe((result:any)=>{
      // console.log(result.data);
      this.editClinicArr=result.data[0]
      // this.clinicArr=result.data;
      // this.dataSource = new MatTableDataSource(this.clinicArr);
      this.createClinicForm.controls.clinic_name.setValue(result.data[0].clinic_name);
      this.createClinicForm.controls.clinic_registration_no.setValue(result.data[0].clinic_registration_no);
      this.createClinicForm.controls.clinic_owner_name.setValue(result.data[0].clinic_owner_name);
      this.createClinicForm.controls.clinic_mobile_number.setValue(result.data[0].clinic_mobile_number);
      this.createClinicForm.controls.clinic_phone_number.setValue(result.data[0].clinic_phone_number);
      this.createClinicForm.controls.clinic_close_time.setValue(result.data[0].clinic_close_time);
      this.createClinicForm.controls.clinic_open_time.setValue(result.data[0].clinic_open_time);
      this.createClinicForm.controls.clinic_pin_code.setValue(result.data[0].clinic_pin_code);
      this.createClinicForm.controls.clinic_area.setValue(result.data[0].clinic_area);
      this.createClinicForm.controls.clinic_city.setValue(result.data[0].clinic_city);
      this.createClinicForm.controls.clinic_state.setValue(result.data[0].clinic_state);
      this.createClinicForm.controls.email.setValue(result.data[0].email);
      this.createClinicForm.controls.password.setValue(result.data[0].password);
      // this.createClinicForm.controls.clinic_logo.setValue(result.data[0].clinic_logo);
   this.images=this.imageUrl + result.data[0].clinic_logo;

    })
   }
}
