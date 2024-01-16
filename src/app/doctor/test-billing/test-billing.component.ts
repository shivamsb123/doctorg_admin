import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppointmentService } from 'src/app/service/appointment.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';
import { map, catchError, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-test-billing',
  templateUrl: './test-billing.component.html',
  styleUrls: ['./test-billing.component.css']
})
export class TestBillingComponent {
  testBillingForm:any;
  testBillingArr:any=[];
  status: any;
  totalPateinttArr: any = [];
  appointmentListArr: any = [];
  authData: any;
  isDiscount:any;
  doctorListArr: any = [];
  singleDoctorDataArr:any=[];
  doctor_name: string;
  test_name: string;
  testArr: any = [];
  isTotalSum:any=0;
  billingSubmitedArr:any=[];
  isDiscountValue:boolean=true;

  name: FormControl;

  filteredCountry: Observable<any[]>;

  constructor(private doctorService: DoctorService, private appointment: AppointmentService, private superAdminService: SuperAdminService) {
    this.authData = this.superAdminService.getAuthUser();
  }

  clickEvent() {
    this.status = !this.status;
  }
  getTotalAppointmentList() {
    this.doctorService.getAllAppointmentBYClinic({clinic_id:this.authData.id}).subscribe((result: any) => {
      this.appointmentListArr = result.data
      // console.log(this.appointmentListArr)
      this.name = new FormControl();
      this.filteredCountry = this.name.valueChanges.pipe(
        startWith(''),
        map((country:any) =>
          country ? this.filtercountry(country) : this.appointmentListArr.slice()
        )
      );
    })
  }

  filtercountry(name: string) {
    let arr = this.appointmentListArr.filter(
      (country) => country.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }
  getDoctorList() {
    this.doctorService.getDoctorByClinicId({id:this.authData.id}).subscribe((result) => {
      this.doctorListArr = result.data;
    })
  }
  getTest() {
    this.doctorService.getAllTest().subscribe((result: any) => {
      this.testArr = result.data
    })
  }
  ngOnInit() {
    this.testBillingForm=new FormGroup({
      // name : new FormControl("",[Validators.required]),
      doctor_name : new FormControl("",[Validators.required]),
      test_name : new FormControl("",[Validators.required])

    })
    this.getTotalAppointmentList()
    this.getDoctorList();
    this.getTest();
   
  }
  billingSubmit(data){
    console.log(data,this.name.value);
    this.testBillingForm.markAllAsTouched();
    if(this.testBillingForm.valid){
    this.isTotalSum=0;
    const object = this.testArr.find(obj => obj.id === data.test_name);
    let isDuplicate=this.testBillingArr.find((o) => o.test_name === object.test_name);
    let clinic_name=this.doctorListArr.find((o) => o.doctor_name === data.doctor_name);
    this.singleDoctorDataArr=clinic_name;
   console.log('clinic name',clinic_name);
    if(isDuplicate){

    }else{
      this.testBillingArr.push({doctor_id:clinic_name.id,clinic_id:clinic_name.clinic_id,isprint:'yes',patient_name:this.name.value,doctor_name:data.doctor_name,price:object.price,test_name:object.test_name,total:object.price})
      this.testBillingArr.forEach(childObj=> {
        this.isTotalSum = this.isTotalSum + parseInt(childObj.total);
     });
    }
   
}
  }
  discount(event,data,index){
    // this.isDiscountValue=event.target.value
    this.isTotalSum=0;
    this.testBillingArr[index].total=data.price - event.target.value;
    this.testBillingArr[index].discount=event.target.value
    this.testBillingArr.forEach(childObj=> {
    this.isTotalSum = this.isTotalSum + parseInt(childObj.total);
 });
  }
  submitBillingData(){
    this.isDiscountValue=false;

    // console.log(this.testBillingArr)
    this.doctorService.addTestBilling({billing:this.testBillingArr}).subscribe((result:any)=>{
     this.billingSubmitedArr=result;
     console.log(this.billingSubmitedArr)
    })
  }
  onPrint(divName) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}
resetForm(){
  this.isDiscountValue=true;
  this.testBillingForm.reset();
  this.testBillingArr=[];
  this.name.reset();
  setTimeout(()=>{                           // <<<---using ()=> syntax
    this.doctorService.updateTestBilling({updateArr:this.billingSubmitedArr}).subscribe((result:any)=>{

    })
}, 2000);
 
}
deleteBilling(data){
  const index = this.testBillingArr.indexOf(data);
if (index > -1) { // only splice array when item is found
  this.testBillingArr.splice(index, 1); // 2nd parameter means remove one item only
}
}
doctorList(data){
  console.log('sdjs',data)
}

}

