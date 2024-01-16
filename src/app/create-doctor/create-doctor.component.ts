import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ClinicService} from '../service/clinic.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import {environment} from '../../environments/environment';
// import {TokenInterceptor} from '../service/tokenInterceptors'
import {SuperAdminService} from '../service/super-admin.service'
@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {
  imageUrl:any=environment.url + "images/"
  images:any;
  authData:any;
  isTodaySat:boolean=false;
  isTodaySunday:boolean=false;

  allDay:any=[
    {key:1, day:"Sunday"},
    {key:2, day:"Monday"},
    {key:3, day:"Tuesday"},
    {key:4, day:"Wednesday"},
    {key:5, day:"Thursday"},
    {key:6, day:"Friday"},
    {key:7, day:"Saturday"},
  ]
  editDoctorcArr:any=[];
  fileToUpload:any;
  doctorId:any;
  dayArr:any=[];
  createDoctorForm:any;
  constructor(public clinicService:ClinicService,public toastrService:ToastrService,public superAdminService:SuperAdminService,
    public router:Router,public activatedRoute:ActivatedRoute) { 
      // console.log(this.superAdminService.getAuthUser());
      this.authData=this.superAdminService.getAuthUser()
    this.activatedRoute.params.subscribe((params: any) => {
      this.doctorId=params;
   })
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    
    this.createDoctorForm=new FormGroup({
      doctor_name : new FormControl("", [Validators.required]),
      doctor_registration_id : new FormControl("", [Validators.required]),
      doctor_year_of_registration : new FormControl("", [Validators.required]),
      doctor_email : new FormControl("", [Validators.required]),
      doctor_mobile_number: new FormControl("", [Validators.required]),
      doctor_speciality : new FormControl("", [Validators.required]),
      professional_bio : new FormControl("", [Validators.required]),
      specialised_treatment : new FormControl("", [Validators.required]),
      heighest_qualification : new FormControl("", [Validators.required]),
      industry_experience : new FormControl("", [Validators.required]),
      from_time : new FormControl("", [Validators.required]),
      to_time : new FormControl("", [Validators.required]),
      from_time1 : new FormControl("", []),
      to_time1 : new FormControl("", []),
      from_time2 : new FormControl("", []),
      to_time2 : new FormControl("", []),

      sat_from_time : new FormControl("", []),
      sat_to_time : new FormControl("", []),

      sat_from_time1 : new FormControl("", []),
      sat_to_time1 : new FormControl("", []),

      sat_from_time2 : new FormControl("", []),
      sat_to_time2 : new FormControl("", []),


      sun_from_time : new FormControl("", []),
      sun_to_time : new FormControl("", []),

      sun_from_time1 : new FormControl("", []),
      sun_to_time1 : new FormControl("", []),

      sun_from_time2 : new FormControl("", []),
      sun_to_time2 : new FormControl("", []),



      
      fees : new FormControl("", [Validators.required]),
      patient_time_duration: new FormControl("", [Validators.required]),
      // availabel_day : new FormControl("", [Validators.required]),
      day_expiry : new FormControl("", [Validators.required]),
      doctor_image : new FormControl("", [Validators.required]),
      clinic_name :new FormControl("", [Validators.required]),
      clinic_address :new FormControl("", [Validators.required]),
      password :new FormControl("", [Validators.required]),
    })
    if(this.doctorId.id){
      this.createDoctorForm.get('doctor_image').clearValidators();
      this.createDoctorForm.updateValueAndValidity();
    }
    this.getDoctorData();
    this.getClinicData();
  }
  onSubmit(){
    this.createDoctorForm.markAllAsTouched();
    if(this.doctorId.id){
      console.log(this.fileToUpload)
      const formData = new FormData();
      formData.append('id', this.doctorId.id);
      if(this.fileToUpload !=undefined)
      formData.append('doctor_image', this.fileToUpload);
      formData.append('doctor_speciality', this.createDoctorForm.value.doctor_speciality);
      formData.append('professional_bio', this.createDoctorForm.value.professional_bio);
      formData.append('specialised_treatment', this.createDoctorForm.value.specialised_treatment);
      formData.append('heighest_qualification', this.createDoctorForm.value.heighest_qualification);
      formData.append('industry_experience', this.createDoctorForm.value.industry_experience);
      formData.append('from_time', this.createDoctorForm.value.from_time);
      formData.append('to_time', this.createDoctorForm.value.to_time);
      formData.append('fees', this.createDoctorForm.value.fees);
      formData.append('availabel_day', this.dayArr);
      formData.append('doctor_registration_id', this.createDoctorForm.value.doctor_registration_id);
      formData.append('doctor_year_of_registration', this.createDoctorForm.value.doctor_year_of_registration);
      formData.append('doctor_mobile_number', this.createDoctorForm.value.doctor_mobile_number);
      formData.append('clinic_address', this.createDoctorForm.value.clinic_address);
      formData.append('password', this.createDoctorForm.value.password);
      formData.append('doctor_email', this.createDoctorForm.value.doctor_email);
      formData.append('clinic_name', this.createDoctorForm.value.clinic_name);
      formData.append('doctor_name', this.createDoctorForm.value.doctor_name);
      formData.append('from_time1', this.createDoctorForm.value.from_time1);
      formData.append('to_time1', this.createDoctorForm.value.to_time1);
      formData.append('from_time2', this.createDoctorForm.value.from_time2);
      formData.append('to_time2', this.createDoctorForm.value.to_time2);
      formData.append('patient_time_duration', this.createDoctorForm.value.patient_time_duration);
      formData.append('day_expiry', this.createDoctorForm.value.day_expiry);


      formData.append('sat_from_time', this.createDoctorForm.value.sat_from_time);
      formData.append('sat_from_time1', this.createDoctorForm.value.sat_from_time1);
      formData.append('sat_from_time2', this.createDoctorForm.value.sat_from_time2);
      formData.append('sat_to_time', this.createDoctorForm.value.sat_to_time);
      formData.append('sat_to_time1', this.createDoctorForm.value.sat_to_time1);
      formData.append('sat_to_time2', this.createDoctorForm.value.sat_to_time2);
      formData.append('sun_from_time', this.createDoctorForm.value.sun_from_time);
      formData.append('sun_from_time1', this.createDoctorForm.value.sun_from_time1);
      formData.append('sun_from_time2', this.createDoctorForm.value.sun_from_time2);
      formData.append('sun_to_time', this.createDoctorForm.value.sun_to_time);
      formData.append('sun_to_time1', this.createDoctorForm.value.sun_to_time1);
      formData.append('sun_to_time2', this.createDoctorForm.value.sun_to_time2);

       this.clinicService.updateDoctor(formData).subscribe(result =>{
         if(result){
           this.router.navigateByUrl('/doctor-list')
         }
       })
    }else{
      if(this.createDoctorForm.valid){
        const formData = new FormData();
        formData.append('doctor_image', this.fileToUpload);
        formData.append('doctor_speciality', this.createDoctorForm.value.doctor_speciality);
        formData.append('professional_bio', this.createDoctorForm.value.professional_bio);
        formData.append('specialised_treatment', this.createDoctorForm.value.specialised_treatment);
        formData.append('heighest_qualification', this.createDoctorForm.value.heighest_qualification);
        formData.append('industry_experience', this.createDoctorForm.value.industry_experience);
        formData.append('from_time', this.createDoctorForm.value.from_time);
        formData.append('to_time', this.createDoctorForm.value.to_time);
        formData.append('fees', this.createDoctorForm.value.fees);
        formData.append('availabel_day', this.dayArr);
        formData.append('doctor_registration_id', this.createDoctorForm.value.doctor_registration_id);
        formData.append('doctor_year_of_registration', this.createDoctorForm.value.doctor_year_of_registration);
        formData.append('doctor_mobile_number', this.createDoctorForm.value.doctor_mobile_number);
        formData.append('clinic_address', this.createDoctorForm.value.clinic_address);
        formData.append('password', this.createDoctorForm.value.password);
        formData.append('doctor_email', this.createDoctorForm.value.doctor_email);
        formData.append('clinic_name', this.createDoctorForm.value.clinic_name);
        formData.append('doctor_name', this.createDoctorForm.value.doctor_name);
      formData.append('from_time1', this.createDoctorForm.value.from_time1);
      formData.append('to_time1', this.createDoctorForm.value.to_time1);
      formData.append('from_time2', this.createDoctorForm.value.from_time2);
      formData.append('to_time2', this.createDoctorForm.value.to_time2);
      formData.append('patient_time_duration', this.createDoctorForm.value.patient_time_duration);
      formData.append('day_expiry', this.createDoctorForm.value.day_expiry);

      formData.append('sat_from_time', this.createDoctorForm.value.sat_from_time);
      formData.append('sat_from_time1', this.createDoctorForm.value.sat_from_time1);
      formData.append('sat_from_time2', this.createDoctorForm.value.sat_from_time2);
      formData.append('sat_to_time', this.createDoctorForm.value.sat_to_time);
      formData.append('sat_to_time1', this.createDoctorForm.value.sat_to_time1);
      formData.append('sat_to_time2', this.createDoctorForm.value.sat_to_time2);
      formData.append('sun_from_time', this.createDoctorForm.value.sun_from_time);
      formData.append('sun_from_time1', this.createDoctorForm.value.sun_from_time1);
      formData.append('sun_from_time2', this.createDoctorForm.value.sun_from_time2);
      formData.append('sun_to_time', this.createDoctorForm.value.sun_to_time);
      formData.append('sun_to_time1', this.createDoctorForm.value.sun_to_time1);
      formData.append('sun_to_time2', this.createDoctorForm.value.sun_to_time2);


          this.clinicService.createDoctor(formData).subscribe(result=>{
            console.log(result);
            if(result.status == 200){
              this.router.navigate(['/doctor-list'])
              this.toastrService.success('Create Doctor Successfully!!');
            }
          })
      }
    }
    // console.log(this.createDoctorForm.value)
    
    
  }
  dayCheckbox(event,day,ind){
    console.log(event.target.checked);
    if(day == 'Saturday'){
      if(event.target.checked){

        this.createDoctorForm.controls['sat_from_time'].setValidators([Validators.required]);
        this.createDoctorForm.controls['sat_from_time'].updateValueAndValidity();

        this.createDoctorForm.controls['sat_to_time'].setValidators([Validators.required]);
        this.createDoctorForm.controls['sat_to_time'].updateValueAndValidity();
      }else{

        this.createDoctorForm.controls["sat_from_time"].clearValidators();
        this.createDoctorForm.controls['sat_from_time'].updateValueAndValidity();

        this.createDoctorForm.controls["sat_to_time"].clearValidators();
        this.createDoctorForm.controls['sat_to_time'].updateValueAndValidity();
      }
      if(this.isTodaySat){
        this.createDoctorForm.controls['sat_from_time'].reset()
        this.createDoctorForm.controls['sat_from_time1'].reset()
        this.createDoctorForm.controls['sat_from_time2'].reset()
        this.createDoctorForm.controls['sat_to_time'].reset()
        this.createDoctorForm.controls['sat_to_time1'].reset()
        this.createDoctorForm.controls['sat_to_time2'].reset()
      }
      this.isTodaySat=!this.isTodaySat;
    }
    if(day == 'Sunday'){
      if(event.target.checked){
        this.createDoctorForm.controls['sun_from_time'].setValidators([Validators.required]);
        this.createDoctorForm.controls['sun_from_time'].updateValueAndValidity();

        this.createDoctorForm.controls['sun_to_time'].setValidators([Validators.required]);
        this.createDoctorForm.controls['sun_to_time'].updateValueAndValidity();
      }else{
        this.createDoctorForm.controls["sun_from_time"].clearValidators();
        this.createDoctorForm.controls['sun_from_time'].updateValueAndValidity();

        this.createDoctorForm.controls["sun_to_time"].clearValidators();
        this.createDoctorForm.controls['sun_to_time'].updateValueAndValidity();

      }
      if(this.isTodaySat){
        this.createDoctorForm.controls['sun_from_time'].reset()
        this.createDoctorForm.controls['sun_from_time1'].reset()
        this.createDoctorForm.controls['sun_from_time2'].reset()
        this.createDoctorForm.controls['sun_to_time'].reset()
        this.createDoctorForm.controls['sun_to_time1'].reset()
        this.createDoctorForm.controls['sun_to_time2'].reset()
      }
      this.isTodaySunday=!this.isTodaySunday;
    }
    // console.log('day 567',day)
   if(event.target.checked){
    this.dayArr.push(day)
   }else{
    const index = this.dayArr.indexOf(day);
      if (true) { // only splice array when item is found
        this.dayArr.splice(index, 1); // 2nd parameter means remove one item only
      }
   }
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  getDoctorData(){
    this.clinicService.getDoctorDataById(this.doctorId).subscribe((result:any)=>{
      if(result.data.length){
        this.isTodaySunday=true
        this.isTodaySat=true;
      this.editDoctorcArr=result.data[0];
      console.log(result.data[0].availabel_day.split(","), result.data[0].availabel_day)
    //  let arr= eval("[" + result.data[0].availabel_day + "]");
    let arr=result.data[0].availabel_day.split(",");
    console.log(arr, arr[0].includes("Friday"))
    //  let arr=eval(result.data[0].availabel_day.split(','));
     for(let i=0;i<arr.length;i++){
      for(let j=0;j<this.allDay.length;j++){
        if(arr[i].includes(this.allDay[j].day)){
          this.allDay[j].checked=true;
          this.dayArr.push(arr[i])
        }else{
          // this.allDay[j].checked=false;
        }
      }
     }
      this.createDoctorForm.controls.doctor_name.setValue(result.data[0].doctor_name);
      this.createDoctorForm.controls.doctor_speciality.setValue(result.data[0].doctor_speciality);
      this.createDoctorForm.controls.professional_bio.setValue(result.data[0].professional_bio);
      this.createDoctorForm.controls.specialised_treatment.setValue(result.data[0].specialised_treatment);
      this.createDoctorForm.controls.heighest_qualification.setValue(result.data[0].heighest_qualification);
      this.createDoctorForm.controls.industry_experience.setValue(result.data[0].industry_experience);
      this.createDoctorForm.controls.from_time.setValue(result.data[0].from_time);
      this.createDoctorForm.controls.to_time.setValue(result.data[0].to_time);

      this.createDoctorForm.controls.from_time1.setValue(result.data[0].from_time1);
      this.createDoctorForm.controls.to_time1.setValue(result.data[0].to_time1);

      this.createDoctorForm.controls.from_time2.setValue(result.data[0].from_time2);
      this.createDoctorForm.controls.to_time2.setValue(result.data[0].to_time2);

      this.createDoctorForm.controls.fees.setValue(result.data[0].fees);

      this.createDoctorForm.controls.doctor_registration_id.setValue(result.data[0].doctor_registration_id);
      this.createDoctorForm.controls.doctor_year_of_registration.setValue(result.data[0].doctor_year_of_registration);
      this.createDoctorForm.controls.doctor_mobile_number.setValue(result.data[0].doctor_mobile_number);
      this.createDoctorForm.controls.clinic_address.setValue(result.data[0].clinic_address);
      this.createDoctorForm.controls.password.setValue(result.data[0].password);
      this.createDoctorForm.controls.doctor_email.setValue(result.data[0].doctor_email);
      this.createDoctorForm.controls.day_expiry.setValue(result.data[0].day_expiry);
      this.createDoctorForm.controls.patient_time_duration.setValue(result.data[0].patient_time_duration);

      this.createDoctorForm.controls.sat_from_time.setValue(result.data[0].sat_from_time);
      this.createDoctorForm.controls.sat_from_time1.setValue(result.data[0].sat_from_time1);
      this.createDoctorForm.controls.sat_from_time2.setValue(result.data[0].sat_from_time2);
      this.createDoctorForm.controls.sat_to_time.setValue(result.data[0].sat_to_time);
      this.createDoctorForm.controls.sat_to_time1.setValue(result.data[0].sat_to_time1);
      this.createDoctorForm.controls.sat_to_time2.setValue(result.data[0].sat_to_time2);


      this.createDoctorForm.controls.sun_from_time.setValue(result.data[0].sun_from_time);
      this.createDoctorForm.controls.sun_from_time1.setValue(result.data[0].sun_from_time1);
      this.createDoctorForm.controls.sun_from_time2.setValue(result.data[0].sun_from_time2);
      this.createDoctorForm.controls.sun_to_time.setValue(result.data[0].sun_to_time);
      this.createDoctorForm.controls.sun_to_time1.setValue(result.data[0].sun_to_time1);
      this.createDoctorForm.controls.sun_to_time2.setValue(result.data[0].sun_to_time2);


      // this.createDoctorForm.controls.doctor_name.setValue(result.data[0].doctor_name);


      this.images=this.imageUrl + result.data[0].doctor_image;
    }
    })
    
  }
  getClinicData(){
    this.superAdminService.getClinicById({id:this.authData.id}).subscribe((result:any)=>{
      this.createDoctorForm.controls.clinic_name.setValue(result.data[0].clinic_name);
       console.log(result);
    })
   }
}
