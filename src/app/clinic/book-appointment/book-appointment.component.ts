import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router,ActivatedRoute } from '@angular/router';
import { Router,ActivatedRoute } from '@angular/router';

import {ClinicService} from '../../service/clinic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  clinicBookAppointmentForm:any;
  loginForm:any;
  isNature:any;
  paramsData:any;
  loginArr:any=[];
  appointmentArr:any=[];
  timeslots:any=[];
  isLogin:boolean=false;
  isDateSelected:boolean=false;
  forOther:any;
  isNatureCheck:boolean=false;
  slotArr:any=[];
  constructor(public cd:ChangeDetectorRef,public toastrService:ToastrService,public router:Router,public activatedRoute:ActivatedRoute,public clinicService:ClinicService) { 
    this.activatedRoute.queryParams.subscribe(params => {
     this.paramsData=params
  });
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      mobile_number:new FormControl('',Validators.required),
    });
    this.clinicBookAppointmentForm=new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      date:new FormControl('',Validators.required),
      time:new FormControl('',Validators.required),
      mobile_number:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      // nature_of_visit:new FormControl('',Validators.required),
      age:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      fees : new FormControl(this.paramsData.fees,Validators.required),
    })
    var d = new Date("2023-02-28");

// document.write('Today is: ' + d.toLocaleString());

    console.log(d.setDate(d.getDate() - 5));

  }
  loginSubmit(data){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.clinicService.patientLogin(data).subscribe((result:any)=>{
        if(result.status == 200){
          this.toastrService.success("Successfully Login");
          this.loginArr=result.userRecord;
          this.clinicBookAppointmentForm.controls['mobile_number'].setValue(this.loginArr.mobile_number);
          this.clinicBookAppointmentForm.controls['name'].setValue(this.loginArr.name);
          // this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);

          this.clinicService.getFollowUp({doctor_id:this.paramsData.doctor_id,patient_id:this.loginArr.id}).subscribe((result:any)=>{
            // console.log(result)
            if(result.status == 200){
              this.loginForm.reset();
              if(result.data.length){
            let patientDate=result.data[result.data.length -1]
            // console.log(patientDate)
            const a = new Date(patientDate.date),
            b = new Date(new Date(this.clinicBookAppointmentForm.value.date))
             const difference:any = this.dateDiffInDays(a, b);
            // console.log(difference,this.paramsData.day_expiry + ' days')
            if(difference >  this.paramsData.day_expiry){
              // console.log("100 rupese")
              this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);
            }else{
              this.clinicBookAppointmentForm.controls['fees'].setValue(0);
            }
            }else{
              this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);
            }
          }
        })
        }else{
          this.toastrService.error("Invalid Number")
        }
      })
    }
  }
  onSubmitAppointment(){
    // console.log(this.clinicBookAppointmentForm.value.date +' '+ '00:00:00')
    this.clinicBookAppointmentForm.markAllAsTouched();

    if(this.clinicBookAppointmentForm.valid && this.isNatureCheck){
    let data={
      id: this.paramsData.doctor_id,
      doctor_name: this.paramsData.doctor_name,
      date: this.clinicBookAppointmentForm.value.date,
      time: this.clinicBookAppointmentForm.value.time,
      name: this.clinicBookAppointmentForm.value.name,
      mobile_number: this.clinicBookAppointmentForm.value.mobile_number,
      email:this.clinicBookAppointmentForm.value.email,
      city: this.clinicBookAppointmentForm.value.city,
      nature_of_visit: this.isNature,
      clinic_id:this.paramsData.clinic_id,
      gender:this.clinicBookAppointmentForm.value.gender,
      age:this.clinicBookAppointmentForm.value.age,
      fees:this.clinicBookAppointmentForm.value.fees,
      forSelect:this.forOther
    }
    //  console.log(data)
     this.clinicService.bookAppointment(data).subscribe((result:any)=>{
       if(result.status == 200){
        //  this.onPrint('print')
         this.toastrService.success("Successfully  Booked","Appointment")
         this.router.navigate(['/total-appointment'])
        //  this.router.navigate(['/clinic-list'])

       }
     })
    }
  }
  onPrint(divName) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}
  nature(event:any){
    this.isNature=event;
    this.isNatureCheck=true;
    if(this.isNature =='Follow Up'){
     this.isLogin=true;
     console.log(this.loginArr)
     if(this.loginArr.id ){
     this.clinicService.getFollowUp({doctor_id:this.paramsData.doctor_id,patient_id:this.loginArr.id}).subscribe((result:any)=>{
      // console.log(result)
      if(result.status == 200){
        if(result.data.length){
      let patientDate=result.data[result.data.length -1]
      // console.log(patientDate)
      const a = new Date(patientDate.date),
      b = new Date(new Date(this.clinicBookAppointmentForm.value.date))
       const difference:any = this.dateDiffInDays(a, b);
      // console.log(difference,this.paramsData.day_expiry + ' days')
      if(difference >  this.paramsData.day_expiry){
        // console.log("100 rupese")
        this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);
      }else{
        this.clinicBookAppointmentForm.controls['fees'].setValue(0);
      }
      }else{
        this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);
      }
    }
  })
}
   }else{
     this.isLogin=false;
    this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);
   }
  }
  dateDiffInDays(a:any, b:any) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  addMinutes(time:any, minutes:any) {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
      ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
      ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
    return tempTime;
  }
  slot3(){
    //  console.log(this.docId.from_time,this.docId.to_time)
     let startAMPM=this.paramsData.from_time2.slice(-2);
     let endAMPM=this.paramsData.to_time2.slice(-2);
     let originalTimeFirst=this.paramsData.from_time2.split(' ')[0];
     let originalTimelast=this.paramsData.to_time2.split(' ')[0];
     let firtsTime=this.paramsData.from_time2.split(':')[0];
     let lastTime=this.paramsData.to_time2.split(':')[0]
     let afterColumnend=this.paramsData.to_time2.split(':')[1].slice(0,2)
     let afterColumnStart=this.paramsData.from_time2.split(':')[1].slice(0,2)
  
  
    //  console.log('fcgvhj',afterColumnend)
      var starttime :any=firtsTime.length == 1 ? '0'+originalTimeFirst + ':00' : originalTimeFirst + ':00';
      var interval =this.paramsData.patient_time_duration;
      var endtime :any=lastTime.length == 1 ? '0'+originalTimelast + ':00' : originalTimelast + ':00';
      // console.log('endtime', endtime == '01:00:00')
      if(startAMPM == 'AM' && endAMPM=='PM'){
        starttime=firtsTime == 12 ? '00:'+afterColumnStart+':00' : starttime
        endtime=lastTime == 12 ? '12:'+afterColumnend+':00': (12 + parseInt(lastTime) + ':'+afterColumnend+":00");
        while (starttime < endtime) {
          let intervalTime=starttime;
          starttime = this.addMinutes(starttime, interval);
          this.timeslots.push({in:intervalTime,out:starttime});
        
        }
      }
      if(startAMPM == 'PM' && endAMPM=='PM'){
        starttime=firtsTime == 12 ? '12:'+afterColumnStart+':00' : (12 + parseInt(firtsTime) + ':'+afterColumnStart+":00")
        endtime=lastTime == 12 ? '12:'+afterColumnend+':00': (12 + parseInt(lastTime) + ':' +afterColumnend+":00");
        // console.log(starttime,endtime)
        while (starttime < endtime) {
          let intervalTime=starttime;
          starttime = this.addMinutes(starttime, interval);
          this.timeslots.push({in:intervalTime,out:starttime});
        
        }
      }
      if(startAMPM == 'PM' && endAMPM=='AM'){
        starttime=firtsTime == 12 ? '12:'+afterColumnStart+':00' : (12 + parseInt(firtsTime) + ':'+afterColumnStart+":00")
        endtime=lastTime == 12 ? '00:'+afterColumnend+':00' : ('0'+lastTime + ':'+afterColumnend + ':00')
        console.log(starttime,endtime)
        while (starttime !== endtime) {
          let intervalTime=starttime;
          starttime = this.addMinutes(starttime, interval);
          this.timeslots.push({in:intervalTime,out:starttime});
        
        }
      }
      if(startAMPM == 'AM' && endAMPM=='AM'){
        while (starttime < endtime) {
          let intervalTime=starttime;
          starttime = this.addMinutes(starttime, interval);
          this.timeslots.push({in:intervalTime,out:starttime});
        }
      }
      // console.log('slot',this.timeslots)
      this.isDropDownList(this.timeslots)
   
    }
  slot2(){
    //  console.log(this.paramsData.from_time,this.paramsData.to_time)
     let startAMPM=this.paramsData.from_time1.slice(-2);
     let endAMPM=this.paramsData.to_time1.slice(-2);
     let originalTimeFirst=this.paramsData.from_time1.split(' ')[0];
     let originalTimelast=this.paramsData.to_time1.split(' ')[0];
     let firtsTime=this.paramsData.from_time1.split(':')[0];
     let lastTime=this.paramsData.to_time1.split(':')[0]
     let afterColumnend=this.paramsData.to_time1.split(':')[1].slice(0,2)
     let afterColumnStart=this.paramsData.from_time1.split(':')[1].slice(0,2)
  
  
    //  console.log('fcgvhj',afterColumnend)
      var starttime :any=firtsTime.length == 1 ? '0'+originalTimeFirst + ':00' : originalTimeFirst + ':00';
      var interval =this.paramsData.patient_time_duration;
      var endtime :any=lastTime.length == 1 ? '0'+originalTimelast + ':00' : originalTimelast + ':00';
      // console.log('endtime', endtime == '01:00:00')
      if(startAMPM == 'AM' && endAMPM=='PM'){
        starttime=firtsTime == 12 ? '00:'+afterColumnStart+':00' : starttime
        endtime=lastTime == 12 ? '12:'+afterColumnend+':00': (12 + parseInt(lastTime) + ':'+afterColumnend+":00");
        while (starttime < endtime) {
          let intervalTime=starttime;
          starttime = this.addMinutes(starttime, interval);
          this.timeslots.push({in:intervalTime,out:starttime});
        
        }
      }
      if(startAMPM == 'PM' && endAMPM=='PM'){
        starttime=firtsTime == 12 ? '12:'+afterColumnStart+':00' : (12 + parseInt(firtsTime) + ':'+afterColumnStart+":00")
        endtime=lastTime == 12 ? '12:'+afterColumnend+':00': (12 + parseInt(lastTime) + ':' +afterColumnend+":00");
        // console.log(starttime,endtime)
        while (starttime < endtime) {
          let intervalTime=starttime;
          starttime = this.addMinutes(starttime, interval);
          this.timeslots.push({in:intervalTime,out:starttime});
        
        }
      }
      if(startAMPM == 'PM' && endAMPM=='AM'){
        starttime=firtsTime == 12 ? '12:'+afterColumnStart+':00' : (12 + parseInt(firtsTime) + ':'+afterColumnStart+":00")
        endtime=lastTime == 12 ? '00:'+afterColumnend+':00' : ('0'+lastTime + ':'+afterColumnend + ':00')
        console.log(starttime,endtime)
        while (starttime !== endtime) {
          let intervalTime=starttime;
          starttime = this.addMinutes(starttime, interval);
          this.timeslots.push({in:intervalTime,out:starttime});
        
        }
      }
      if(startAMPM == 'AM' && endAMPM=='AM'){
        while (starttime < endtime) {
          let intervalTime=starttime;
          starttime = this.addMinutes(starttime, interval);
          this.timeslots.push({in:intervalTime,out:starttime});
        }
      }
      // console.log('slot',this.timeslots)
      this.isDropDownList(this.timeslots)
   
    }
  slot(){
  //  console.log(this.paramsData.from_time,this.paramsData.to_time)
   let startAMPM=this.paramsData.from_time.slice(-2);
   let endAMPM=this.paramsData.to_time.slice(-2);
   let originalTimeFirst=this.paramsData.from_time.split(' ')[0];
   let originalTimelast=this.paramsData.to_time.split(' ')[0];
   let firtsTime=this.paramsData.from_time.split(':')[0];
   let lastTime=this.paramsData.to_time.split(':')[0]
   let afterColumnend=this.paramsData.to_time.split(':')[1].slice(0,2)
   let afterColumnStart=this.paramsData.from_time.split(':')[1].slice(0,2)


  //  console.log('fcgvhj',afterColumnend)
    var starttime :any=firtsTime.length == 1 ? '0'+originalTimeFirst + ':00' : originalTimeFirst + ':00';
    var interval = this.paramsData.patient_time_duration;
    var endtime :any=lastTime.length == 1 ? '0'+originalTimelast + ':00' : originalTimelast + ':00';
    // console.log('endtime', endtime == '01:00:00')
    if(startAMPM == 'AM' && endAMPM=='PM'){
      starttime=firtsTime == 12 ? '00:'+afterColumnStart+':00' : starttime
      endtime=lastTime == 12 ? '12:'+afterColumnend+':00': (12 + parseInt(lastTime) + ':'+afterColumnend+":00");
      while (starttime < endtime) {
        let intervalTime=starttime;
        starttime = this.addMinutes(starttime, interval);
        this.timeslots.push({in:intervalTime,out:starttime});
      
      }
    }
    if(startAMPM == 'PM' && endAMPM=='PM'){
      starttime=firtsTime == 12 ? '12:'+afterColumnStart+':00' : (12 + parseInt(firtsTime) + ':'+afterColumnStart+":00")
      endtime=lastTime == 12 ? '12:'+afterColumnend+':00': (12 + parseInt(lastTime) + ':' +afterColumnend+":00");
      // console.log(starttime,endtime)
      while (starttime < endtime) {
        let intervalTime=starttime;
        starttime = this.addMinutes(starttime, interval);
        this.timeslots.push({in:intervalTime,out:starttime});
      
      }
    }
    if(startAMPM == 'PM' && endAMPM=='AM'){
      starttime=firtsTime == 12 ? '12:'+afterColumnStart+':00' : (12 + parseInt(firtsTime) + ':'+afterColumnStart+":00")
      endtime=lastTime == 12 ? '00:'+afterColumnend+':00' : ('0'+lastTime + ':'+afterColumnend + ':00')
      // console.log(starttime,endtime)
      while (starttime !== endtime) {
        let intervalTime=starttime;
        starttime = this.addMinutes(starttime, interval);
        this.timeslots.push({in:intervalTime,out:starttime});
      
      }
    }
    if(startAMPM == 'AM' && endAMPM=='AM'){
      while (starttime < endtime) {
        let intervalTime=starttime;
        starttime = this.addMinutes(starttime, interval);
        this.timeslots.push({in:intervalTime,out:starttime});
      }
    }
    // console.log('slot',this.timeslots)
    this.isDropDownList(this.timeslots)
 
  }
  isDropDownList(slot:any){
  slot.forEach((element:any) => {
    // console.log(element)
    let firtsTime=element.in.split(':')[0];
   let lastTime=element.out.split(':')[0];
   let afterColumnOutTime=element.out.split(':')[1].slice(0,2)
   let afterColumnInTime=element.in.split(':')[1].slice(0,2)
    // console.log(lastTime-1)
  var inTime=firtsTime == '00' ? (12 + ':' +afterColumnInTime + ' Am') : (firtsTime >=12 ? (firtsTime == 12 ? (firtsTime  + ':'+afterColumnInTime + ' PM') :(firtsTime - 12) + ':'+afterColumnInTime + ' PM'):element.in.slice(0, -3) + ' AM')
  var outTime=lastTime== '00' ?(12 + ':' + afterColumnOutTime + ' AM'): parseInt(lastTime )>=12 ? (parseInt(lastTime) == 12 ? (parseInt(lastTime)) + ':'+afterColumnOutTime + ' PM' :(parseInt(lastTime)-12) + ':'+afterColumnOutTime + ' PM') : element.out.slice(0, -3) + ' AM'
  //  console.log('1234567890',inTime,outTime,this.appointmentArr)
   const found = this.appointmentArr.some((el:any) => el.time === inTime +' to ' + outTime);
  //  console.log(found)
   if(found){

   }else{
    this.slotArr.push({time : inTime +' to ' + outTime})
    this.cd.detectChanges();
    // console.log(this.slotArr)
   }
  }); 
  }
  // alert(timeslots);getAppointmentByDoctor
  selectedDate(){
    this.isDateSelected=true
    if(this.isNature =='Follow Up'){
      this.isLogin=true;
      console.log(this.loginArr)
      if(this.loginArr.id ){
      this.clinicService.getFollowUp({doctor_id:this.paramsData.doctor_id,patient_id:this.loginArr.id}).subscribe((result:any)=>{
       // console.log(result)
       if(result.status == 200){
         if(result.data.length){
       let patientDate=result.data[result.data.length -1]
       // console.log(patientDate)
       const a = new Date(patientDate.date),
       b = new Date(new Date(this.clinicBookAppointmentForm.value.date))
        const difference:any = this.dateDiffInDays(a, b);
       // console.log(difference,this.paramsData.day_expiry + ' days')
       if(difference >  this.paramsData.day_expiry){
         // console.log("100 rupese")
         this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);
       }else{
         this.clinicBookAppointmentForm.controls['fees'].setValue(0);
       }
       }else{
         this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);
       }
     }
   })
 }
    }else{
     this.clinicBookAppointmentForm.controls['fees'].setValue(this.paramsData.fees);
    }
    // console.log('calling',this.clinicBookAppointmentForm.date)
    this.clinicService.getAppointmentData({date:this.clinicBookAppointmentForm.value.date,id:this.paramsData.doctor_id}).subscribe((result:any)=>{
     if(result.status == 200){
      this.slotArr=[];
      this.appointmentArr=result.data;
      this.slot();
      if(this.paramsData.from_time1 !='' && this.paramsData.to_time1 !='')
       this.slot2();
       if(this.paramsData.from_time2 !='' && this.paramsData.to_time2 !='')
      this.slot3();
     }
    })
  }
  selectedFor(data:any){
    this.forOther=data;
   }
}
