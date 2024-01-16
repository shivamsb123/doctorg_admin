import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClinicService } from 'src/app/service/clinic.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';
import {AppointmentService} from '../../service/appointment.service'
@Component({
  selector: 'app-pending-appointment',
  templateUrl: './pending-appointment.component.html',
  styleUrls: ['./pending-appointment.component.css']
})
export class PendingAppointmentComponent {
  pendingDataArr: any=[];
  status: any;
  pendingData: any;
  authData: any;
  singleDataArr:any=[];
  isloading:boolean=true;

  pendingRegisterArr: any = [];
  constructor(public route:ActivatedRoute,public appointmentService:AppointmentService, private clinicService:ClinicService,public superAdminService:SuperAdminService){

    this.route.queryParams.subscribe(params =>{
      this.pendingData = params;
      // console.log("data",this.pendingDataArr)
    })
  }
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.getPendingAppointment()
    this.pateintRegister();
    this.getSingleDoctorData();
  }
getPendingAppointment(){
  this.clinicService.getPendingAppointmentById(this.pendingData.id).subscribe((result=>{
    // console.log("pending",result);
    this.pendingDataArr=result.data
    // console.log("arr",this.pendingDataArr)
  }))
}
pateintRegister(){
  this.clinicService.getPateintDetail(this.pendingData.patient_id).subscribe((result:any)=>{
    // this.isloading=false;
   this.pendingRegisterArr = result.data
// console.log("data",result)
  })
}
getSingleDoctorData(){
  this.appointmentService.getDoctorDetail({id:this.pendingData.doctor_id}).subscribe((result)=>{
    // console.log('ree',result)
    this.isloading=false;
    this.singleDataArr=result.data;
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
