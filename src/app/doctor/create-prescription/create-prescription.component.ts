import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../service/super-admin.service';
import { DoctorService } from '../../service/doctor.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { NgxPrintElementService } from 'ngx-print-element';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-create-prescription',
  templateUrl: './create-prescription.component.html',
  styleUrls: ['./create-prescription.component.css']
})
export class CreatePrescriptionComponent implements OnInit {
  imgUrl:any=environment.url + 'prescription/'
  authData: any
  status: any;
  complaintArr: any = [];
  isCheckedCompalintArr: any = [];
  diagnosisArr:any=[]
  investigationArr:any=[];
  isCheckedDiagnosisArr:any=[];
  ischeckedInvestigationArr:any=[];
  ischeckedSeArr:any=[];
  seArr:any=[];
  diseaseArr:any=[];
  medicineArr:any=[];
  ischeckedMedicineArr:any=[];
  bpCheck:any;
  special_notes:any;
  appointmentData:any;
  profileDataArr:any=[];
  fileToUpload: File | null = null;
  todayDate = Date.now();
  isTiming:any;
  timeMedicine:any;
  patientReportArr:any=[];

  constructor(public toastrService:ToastrService,public router:Router,public superAdminService: SuperAdminService, public doctorService: DoctorService,private route: ActivatedRoute) {
    this.authData = this.superAdminService.getAuthUser()
    this.route.queryParams.subscribe(params => {
      this.appointmentData=params;
      // console.log(params)
  });
  }
  clickEvent() {
    this.status = !this.status;
  }

  ngOnInit() {
    this.getComplaintData();
    this.getDiagnosisData();
    this.getInvestigationDta();
    this.getSeModalData();
    this.getDisease();
    this.getProfileData();
    this.getPatientReportData();
  }
  getProfileData(){
    this.doctorService.getPatientProfile(this.appointmentData).subscribe((result:any)=>{
     this.profileDataArr=result.data;
    })
  }
  getComplaintData() {
    this.doctorService.getAllChief({ id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result: any) => {
      this.complaintArr = result.data;
    })
  }
  getDiagnosisData(){
    this.doctorService.getDiagnosis({id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result:any)=>{
     this.diagnosisArr=result.data;
    })
  }
  getInvestigationDta(){
    this.doctorService.getInvestigation({id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result:any)=>{
      this.investigationArr=result.data;
    })
  }
  getSeModalData(){
    this.doctorService.getSEData({id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result:any)=>{
     this.seArr=result.data;
    })
  }
  getDisease(){
    this.doctorService.getDesease({id: this.authData.id, clinic_id: this.authData.clinic_id }).subscribe((result:any)=>{
      this.diseaseArr=result.data;
    })
  } 
  getMedicine(data){
  //  console.log(data)
   this.doctorService.getAllMedicineBYDisease(data).subscribe((result:any)=>{
    this.medicineArr=result.data;
   })
  }
  complaintCheck(event, data) {
    // console.log(event.target.checked, data);
    if (event.target.checked) {
      this.isCheckedCompalintArr.push(data)
    } else {
      const index = this.isCheckedCompalintArr.indexOf(data);
        if (index > -1) { // only splice array when item is found
          this.isCheckedCompalintArr.splice(index, 1); // 2nd parameter means remove one item only
          // console.log(this.isCheckedCompalintArr)
        }
    }
  }
  removeComplaint(data){
    const index = this.isCheckedCompalintArr.indexOf(data);
    if (index > -1) { // only splice array when item is found
      this.isCheckedCompalintArr.splice(index, 1); // 2nd parameter means remove one item only
      // console.log(this.isCheckedCompalintArr)
    }
    
    const indexs = this.complaintArr.indexOf(data);
    if (indexs > -1) {
      this.complaintArr[indexs].isChecked=false;
    }
  }
  diagnosisCheck(event,data){
    if (event.target.checked) {
      this.isCheckedDiagnosisArr.push(data);
      // console.log(this.isCheckedDiagnosisArr)
    } else {
      const index = this.isCheckedDiagnosisArr.indexOf(data);
        if (index > -1) { // only splice array when item is found
          this.isCheckedDiagnosisArr.splice(index, 1); // 2nd parameter means remove one item only
          // console.log(this.isCheckedCompalintArr)
        }
    }
  }
  removeDiagnosis(data){
    const index = this.isCheckedDiagnosisArr.indexOf(data);
    if (index > -1) { // only splice array when item is found
      this.isCheckedDiagnosisArr.splice(index, 1); // 2nd parameter means remove one item only
      // console.log(this.isCheckedCompalintArr)
    }
    const indexs = this.diagnosisArr.indexOf(data);
    if (indexs > -1) { // only splice array when item is found
      this.diagnosisArr[indexs].isChecked=false;
    }
  }
  investigationCheck(event,data){
    // console.log(event,data)
    if (event.target.checked) {
      this.ischeckedInvestigationArr.push(data);
      // console.log(this.isCheckedDiagnosisArr)
    } else {
      const index = this.ischeckedInvestigationArr.indexOf(data);
        if (index > -1) { // only splice array when item is found
          this.ischeckedInvestigationArr.splice(index, 1); // 2nd parameter means remove one item only
          // console.log(this.isCheckedCompalintArr)
        }
    }
  }
  removeInvestigation(data){
    const index = this.ischeckedInvestigationArr.indexOf(data);
    if (index > -1) { 
      this.ischeckedInvestigationArr.splice(index, 1); 
    }
    const indexs = this.investigationArr.indexOf(data);
    if (indexs > -1) { // only splice array when item is found
      this.investigationArr[indexs].isChecked=false;
    }
  }
  seCheck(event,data){
    if (event.target.checked) {
      this.ischeckedSeArr.push(data);
    } else {
      const index = this.ischeckedSeArr.indexOf(data);
        if (index > -1) { 
          this.ischeckedSeArr.splice(index, 1);
        }
    }
  }
  removeSe(data){
    const index = this.ischeckedSeArr.indexOf(data);
    if (index > -1) { 
      this.ischeckedSeArr.splice(index, 1); 
    }
    const indexs = this.seArr.indexOf(data);
    if (indexs > -1) { // only splice array when item is found
      this.seArr[indexs].isChecked=false;
    }
  }
  removeBP(){
    this.bpCheck='';
  }
  medicineCheck(event ,data){
    if (event.target.checked) {
      this.ischeckedMedicineArr.push(data);
      
    } else {
      const index = this.ischeckedMedicineArr.indexOf(data);
        if (index > -1) { 
          this.ischeckedMedicineArr.splice(index, 1); 
        }
    }
  }
  removeMedicine(data){
    const index = this.ischeckedMedicineArr.indexOf(data);
    if (index > -1) { 
      this.ischeckedMedicineArr.splice(index, 1); 
    }
    const indexs = this.medicineArr.indexOf(data);
    if (indexs > -1) { // only splice array when item is found
      this.medicineArr[indexs].isChecked=false;
      // console.log(this.medicineArr)
    }
  }
  onPrint(divName) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    this.submitPriscription()
    this.router.navigateByUrl('/appointment')
}
submitPriscription(){
  let data={
    medicine:this.ischeckedMedicineArr,
    se:this.ischeckedSeArr,
    diagnosis:this.isCheckedDiagnosisArr,
    chief_complaint : this.isCheckedCompalintArr,
    investigation:this.ischeckedInvestigationArr,
    bp:this.bpCheck,
    notes:this.special_notes,
    doctor_id:this.authData.id,
    clinic_id:this.authData.clinic_id,
    patient_id:this.appointmentData.patient_id,
    appointment_id:this.appointmentData.appointment_id
  }
//  console.log(data);
 this.doctorService.addPrescription(data).subscribe((result:any)=>{
  if(result.status == 200){
    // this.router.navigate(['/appointment'])
    // this.router.navigate(['/chief-complaint-list'])
    location.reload();
    this.toastrService.success("Successfully Added","Prescription")

  }
 })
}
handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}
uploadFileToActivity() {
  // console.log(this.fileToUpload)
  const formData = new FormData();
  // if(this.fileToUpload !=undefined)
  formData.append('prescriptionFile', this.fileToUpload);
  formData.append('doctor_id', this.authData.id);
  formData.append('clinic_id',this.authData.clinic_id);
  formData.append('patient_id', this.appointmentData.patient_id);

  this.doctorService.priscriptionFile(formData).subscribe((data:any )=> {
    // do something, if upload success
    if(data.status == 200){
    this.toastrService.success("Successfully Uploaded","Prescription")
    this.router.navigate(['/appointment'])

    }
    }, error => {
      console.log(error);
    });
}
timingUpdate(){
  const indexs = this.ischeckedMedicineArr.indexOf(this.timeMedicine);
    if (indexs > -1) {
      this.ischeckedMedicineArr[indexs].medicine_timing=this.isTiming;
    }
    const index = this.medicineArr.indexOf(this.timeMedicine);
    if (index > -1) {
      this.medicineArr[index].medicine_timing=this.isTiming;
    }
}
editTomeMedicine(data){
//  console.log(data);
this.isTiming=data.medicine_timing;
 this.timeMedicine=data;
}
getPatientReportData(){
  this.doctorService.getPatietReport({id:this.appointmentData.appointment_id}).subscribe((result:any)=>{
    console.log('report',result);
    this.patientReportArr=result.data;
  })
}
}

