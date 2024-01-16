import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ClinicService} from '../service/clinic.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import {environment} from '../../environments/environment';
// import {TokenInterceptor} from '../service/tokenInterceptors'
import {SuperAdminService} from '../service/super-admin.service';
declare var $: any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  imageUrl:any=environment.url + "blog/"
  images:any;
  authData:any;
  editDoctorcArr:any=[];
  fileToUpload:any;
  doctorId:any;
  dayArr:any=[];
  BlogAdd:any;
  BlogData:any;
  createDoctorForm:any;
  isloading:boolean=true;

  constructor(public clinicService:ClinicService,public toastrService:ToastrService,public superAdminService:SuperAdminService,
    public router:Router,public activatedRoute:ActivatedRoute) { 
      // console.log(this.superAdminService.getAuthUser());
      this.authData=this.superAdminService.getAuthUser()
    this.activatedRoute.params.subscribe((params: any) => {
      this.doctorId=params;
      this.getBlog();
   })
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.BlogAdd=new FormGroup({
      title:new FormControl("", [Validators.required]),
      shorttitle:new FormControl("", [Validators.required]),
      image:new FormControl("", [Validators.required]),
      description:new FormControl("", [Validators.required]),
    });
    if(this.doctorId.id){
      this.BlogAdd.get('image').clearValidators();
      this.BlogAdd.updateValueAndValidity();
    }
    // this.getDoctorData();
    this.getBlog();
  }
  onSubmit(){
    this.BlogAdd.markAllAsTouched();
      if(this.BlogAdd.valid){
        // console.log(this.isloading)
        const formData = new FormData();
        formData.append('blog', this.fileToUpload);
        formData.append('contentFirst', this.BlogAdd.value.title);
        formData.append('contentSecond', this.BlogAdd.value.shorttitle);
        formData.append('long_description', this.BlogAdd.value.description);
          this.superAdminService.createBlog(formData).subscribe(result=>{
            // console.log(result);
            // this.isloading=false;
            this.getBlog();
            this.BlogAdd.reset();
            $("#exampleModal").modal('hide');
            if(result.status == 200){
              this.toastrService.success('Blog Added Successfully!!');
            }
          })
      }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.images=this.imageUrl + this.fileToUpload.name;
    console.log("uploaded file ::::",this.images)
  }

  deleteblog(id){
    this.superAdminService.DeleteBlog(id).subscribe((result:any)=>{
      this.getBlog();
    })    
  }

  Editblog(id){
    this.router.navigate([`/edit-blog/${id}`])
  }
  getBlog(){
    this.superAdminService.getBlog().subscribe((result:any)=>{
      this.isloading=false
       console.log("Blog Data",result);
       this.BlogData=result.data;
    })
   }

   add(){
    this.router.navigate(['/add-blog'])
   }
  
   getClinicData(){
    this.superAdminService.getClinicById({id:this.authData.id}).subscribe((result:any)=>{
      this.createDoctorForm.controls.clinic_name.setValue(result.data[0].clinic_name);
       console.log(result);
    })
   }

   getDoctorData(){
    this.clinicService.getDoctorDataById(this.doctorId).subscribe((result:any)=>{
      if(result.data.length){
      this.editDoctorcArr=result.data[0];
     let arr=JSON.parse(result.data[0].availabel_day).split(',');
      this.createDoctorForm.controls.doctor_name.setValue(result.data[0].doctor_name);
      this.createDoctorForm.controls.doctor_speciality.setValue(result.data[0].doctor_speciality);
      this.createDoctorForm.controls.professional_bio.setValue(result.data[0].professional_bio);
      this.createDoctorForm.controls.specialised_treatment.setValue(result.data[0].specialised_treatment);
      this.createDoctorForm.controls.heighest_qualification.setValue(result.data[0].heighest_qualification);
      this.createDoctorForm.controls.industry_experience.setValue(result.data[0].industry_experience);
      this.createDoctorForm.controls.from_time.setValue(result.data[0].from_time);
      this.createDoctorForm.controls.to_time.setValue(result.data[0].to_time);
      this.createDoctorForm.controls.fees.setValue(result.data[0].fees);

      this.createDoctorForm.controls.doctor_registration_id.setValue(result.data[0].doctor_registration_id);
      this.createDoctorForm.controls.doctor_year_of_registration.setValue(result.data[0].doctor_year_of_registration);
      this.createDoctorForm.controls.doctor_mobile_number.setValue(result.data[0].doctor_mobile_number);
      this.createDoctorForm.controls.clinic_address.setValue(result.data[0].clinic_address);
      this.createDoctorForm.controls.password.setValue(result.data[0].password);
      this.createDoctorForm.controls.doctor_email.setValue(result.data[0].doctor_email);
      this.createDoctorForm.controls.day_expiry.setValue(result.data[0].day_expiry);
      // this.createDoctorForm.controls.doctor_name.setValue(result.data[0].doctor_name);


      this.images=this.imageUrl + result.data[0].images;
    }
    })
    
  }
}

