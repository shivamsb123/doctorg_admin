import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../service/doctor.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {
  status: any;
  appointmentData:any;
  prescriptionArr:any=[];
  clickEvent() {
    this.status = !this.status;
  }
  constructor(public route:ActivatedRoute,public doctorService:DoctorService){
    this.route.queryParams.subscribe(params => {
      this.appointmentData=params;
      // console.log(params)
  });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getPatientPrescription();
  }
  getPatientPrescription(){
    this.doctorService.getPrescription(this.appointmentData).subscribe((result:any)=>{
    //  console.log(result);
     this.prescriptionArr=result.data;
    })
  }
}
