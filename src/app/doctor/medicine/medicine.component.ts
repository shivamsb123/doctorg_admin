import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,FormArray,AbstractControl, Form } from '@angular/forms';
import {SuperAdminService} from '../../service/super-admin.service';
import {DoctorService} from '../../service/doctor.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit{
  status: boolean;
  authData:any;
  medicineArr:any=[];
  disease_name:any;
  clickEvent(){
    this.status !=this.status
  }
  orderForm: FormGroup;
  items: FormArray;

  constructor(public router:Router,public doctorService : DoctorService,private formBuilder: FormBuilder,public superAdminService:SuperAdminService) {
    this.authData=this.superAdminService.getAuthUser()
  }
  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      // email: '',
      disease_name:'',
      items: this.formBuilder.array([ this.createItem() ])
    });
    this.getDisease();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      medicine_name: '',
      medicine_content: '',
      medicine_timing: ''
    });
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  submitForm(data){
  //  console.log(this.disease_name);
   data.id=this.authData.id;
   data.clinic_id=this.authData.clinic_id;
   this.doctorService.addMedicine(data).subscribe((result:any)=>{
     if(result.status == 200){
       this.router.navigate(['/medicine-list'])
     }
   })
  }
  getDisease(){
    this.doctorService.getDesease({id:this.authData.id,clinic_id:this.authData.clinic_id}).subscribe((result:any)=>{
       if(result.status == 200){
         this.medicineArr=result.data;
       }
    })
  }
}
