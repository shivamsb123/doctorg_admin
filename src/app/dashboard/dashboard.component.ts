import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import Chart from 'chart.js/auto';
// import { DistrictService } from '../service/district.service';
import { OthenticationService } from '../service/othentication.service';
import { NgxSpinnerService } from "ngx-spinner";
// import Chart from 'chart.js/auto';
// import Chart from 'chart.js';
// import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';
// import { ChartData, ChartEvent, ChartType } from 'chart.js';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { DoctorService } from '../service/doctor.service';
import { SuperAdminService } from '../service/super-admin.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  janArr:any=[];
  febArr:any=[];
  marchArr:any=[];
  aprilArr:any=[];
  mayArr:any=[];
  junArr:any=[];
  julyArr:any=[];
  AugustArr:any=[];
  septArr:any=[];
  octArr:any=[];
  novArr:any=[]
  decArr:any=[];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  isloading:boolean=true;
  status: boolean = false;
  clinicArr: any=[];
  doctorListArr: any=[];
  appointmentArr: any=[];
  clickEvent() {
    this.status = !this.status;
  }
  isTotalSum:any=0;

  constructor(
    private elementRef: ElementRef,
    private apiService: OthenticationService,
    private fb: FormBuilder,
    public doctorService:DoctorService,
    // private distService: DistrictService,
    public spinner:NgxSpinnerService,
    private superAdminService:SuperAdminService
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Appointment",
          data: [0,0,0,0,0,0,0,0,0,0]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My Months Total Appointment Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep","Oct","Nov","Dec"]
      }
  }
  }

  ngOnInit(): void {
this.getDoctorList();
this.getClinicData();
this.getAllDoctorAppointmnet();
  }
  ngAfterViewInit() {}

  getDoctorList(){
    this.doctorService.getAllDoctorList().subscribe((result=>{
      this.isloading=false;
      this.doctorListArr = result.data;
      console.log(result);
      result.data.forEach(obj => {
       this.isTotalSum=this.isTotalSum + obj.total_amount;
    });
    }))
  }
  getClinicData(){
    this.superAdminService.getClinicAllData().subscribe((result:any)=>{
      this.clinicArr=result.data;
    })
}
getAllDoctorAppointmnet(){
  this.doctorService.getAllAppointment().subscribe((result:any)=>{
    // console.log(result);
    this.appointmentArr = result.data
    result.data.filter(e => {
      var [year, month] = e.createdAt.split('-');
      if(month == '01'){
        this.janArr.push(e)
      }
      else if(month == '02'){
        this.febArr.push(e)
      }
      else if(month == '03'){
        this.marchArr.push(e)
      }
      else if(month == '04'){
        this.aprilArr.push(e)
      }
      else if(month == '05'){
        this.mayArr.push(e)
      }
      else if(month == '06'){
        this.junArr.push(e)
      }
      else if(month == '07'){
        this.julyArr.push(e)
      }
      else if(month == '08'){
        this.AugustArr.push(e)
      }
      else if(month == '09'){
        this.septArr.push(e)
      }
      else if(month == '10'){
        this.octArr.push(e)
      }
      else if(month == '11'){
        this.novArr.push(e)
      }
      else if(month == '12'){
        this.decArr.push(e)
      }

  });
  this.chartLoad();
  })
}
chartLoad(){
  this.chartOptions = {
    series: [
      {
        name: "Appointment",
        data: [this.janArr.length,this.febArr.length, this.marchArr.length, this.aprilArr.length, this.mayArr.length, this.junArr.length, this.julyArr.length, this.AugustArr.length,this.septArr.length,this.octArr.length,this.novArr.length,this.decArr.length]
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    title: {
      text: "My Months Total Appointment Chart"
    },
    xaxis: {
      categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep","Oct","Nov","Dec"]
    }
}
}
}