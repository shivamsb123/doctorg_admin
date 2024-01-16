import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/service/doctor.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SuperAdminService } from 'src/app/service/super-admin.service';


@Component({
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.css']
})
export class DayBookComponent {
  status: any;
  dayBookForm:any;
  testArr: any=[];
  isTotalAmount:any=0;
  dropdownSettings:IDropdownSettings = {}
  authData: any;
  allSelectArr: any = [];
  singleSelectArr: any = [];
  appointmentArr: any = [];
  testBillingArr: any = [];
  isBillingSum: any = 0;
  isAppointmentSum: any = 0;
  isBillingDiscount: any = 0;
  constructor(private doctorService: DoctorService, private superAdminService: SuperAdminService) {
    this.authData = this.superAdminService.getAuthUser();
  }

  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit() {
    this.dayBookForm = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      dropDown: new FormControl('')
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'test_name',
      allowSearchFilter: true
    };
    this.getTest();
  }
  onItemSelect(item: any) {
    this.singleSelectArr.push(item.test_name)
    console.log(this.singleSelectArr);
  }
  onSelectAll(items: any) {
    items.forEach(childObj => {
      this.allSelectArr.push(childObj.test_name)
    });
    console.log(this.allSelectArr.length);
  }
  getTest() {
    this.doctorService.getAllTest().subscribe((result: any) => {
      this.testArr = result.data
    })
  }
  submitDaybook(data) {
    // console.log(data);
    this.isBillingSum=0;
    this.isAppointmentSum=0;
    this.isBillingDiscount=0;
    this.isTotalAmount=0;
    delete data.dropDown;
    data.test_name=this.allSelectArr.length ? this.allSelectArr:this.singleSelectArr;
    data.id=this.authData.id;
    data.startDate=data.fromDate+' '+'00:00:00';
    data.endDate=data.toDate+' '+'23:59:00';
    data.clinic_id=this.authData.clinic_id;
    this.doctorService.sendFromToDate(data).subscribe((result:any) =>{
     console.log(data);
     this.appointmentArr=result.dataAppointment;
     this.testBillingArr=result.dataBilling;
     console.log("total",this.testBillingArr)

     this.testBillingArr.forEach(childObj=> {
      this.isBillingSum=parseInt(this.isBillingSum) +  parseInt(childObj.price);
      this.isBillingDiscount=this.isBillingDiscount + (parseInt(childObj.price) - parseInt(childObj.total))

   });
   this.testBillingArr.forEach(childObj=> {
    this.isTotalAmount=parseInt(this.isTotalAmount) +  parseInt(childObj.total);
    // this.isBillingDiscount=this.isBillingDiscount + (parseInt(childObj.price) - parseInt(childObj.total))
 });
   this.appointmentArr.forEach(childObj=> {
    this.isAppointmentSum=parseInt(this.isAppointmentSum) +  parseInt(childObj.fees);
 });
    //  this.testBillingArr.concat(result.dataAppointment);
    //  console.log(this.testBillingArr)
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
}
