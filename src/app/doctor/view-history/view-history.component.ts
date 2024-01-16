import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent implements OnInit{
  historyData:any
  status: any;
  chiefArr:any=[]
  diagnosisArr:any=[]
  medicineArr:any=[]
  seArr:any=[];
  invArr:any=[];
  historyArr:any=[];
  profileDataArr:any=[];
  clickEvent() {
    this.status = !this.status;
  }
  constructor(public route:ActivatedRoute,public doctorService:DoctorService){
    this.route.queryParams.subscribe(params => {
      this.historyData=params;
  });
  }
  ngOnInit(): void {
    this.getprescriptionHistor()
    this.getProfileData();
  }
  getProfileData(){
    this.doctorService.getPatientProfile(this.historyData).subscribe((result:any)=>{
     this.profileDataArr=result.data;
    })
  }
  getprescriptionHistor(){
    this.doctorService.getPrescriptionHistory(this.historyData).subscribe((result:any)=>{
      this.historyArr=result.data;
      this.historyArr.forEach((obj: any) => {
        // console.log('456789',obj)
        eval(obj.chief_complaint).forEach((childObj: any) => {
          // this.chiefArr = childObj;
          this.chiefArr.push(childObj)
          // console.log(childObj)
        });
        eval(obj.diagnosis).forEach((childObj: any) => {
          // this.diagnosisArr = childObj;
          this.diagnosisArr.push(childObj)

        });
        eval(obj.investigation).forEach((childObj: any) => {
          // this.invArr = childObj;
          this.invArr.push(childObj)

        });
        eval(obj.medicine).forEach((childObj: any) => {
          // this.medicineArr = childObj;
          this.medicineArr.push(childObj)

        });
        eval(obj.se).forEach((childObj: any) => {
          // this.seArr = childObj;
          this.seArr.push(childObj)
        });
        
      });
    })
  }
  onPrint(divName) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();

    // this.submitPriscription()
}
}
