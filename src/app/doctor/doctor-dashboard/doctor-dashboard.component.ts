import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { AppointmentService } from 'src/app/service/appointment.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctorArr:any=[];
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
  appointmentLengthArr: any=[]
  appointmentPendingArr: any=[]
  authData: any;
  isloading:boolean=true;

  constructor(private appointment:AppointmentService,public superAdminService:SuperAdminService) { 
    // console.log(this.febArr.length)
   this.authData=this.superAdminService.getAuthUser()
  //  console.log('ababs',this.authData)
  this.chartOptions = {
    series: [
      {
        name: "My-series",
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    title: {
      text: "My Months Chart"
    },
    xaxis: {
      categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep","Oct","Nov","Dec"]
    }
}

  }
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
this.getTodayAmount()
this.getAppointmentLength()
this.getPendingData()

  }
  getAppointmentLength(){
    this.appointment.getAllCompleteAppointment(this.authData).subscribe((result:any)=>{
      this.isloading=false
      this.appointmentLengthArr = result.data;
      this.appointmentLengthArr.filter(e => {
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
          name: "complete-pateint",
          data: [this.janArr.length,this.febArr.length, this.marchArr.length, this.aprilArr.length, this.mayArr.length, this.junArr.length, this.julyArr.length, this.AugustArr.length,this.septArr.length,this.octArr.length,this.novArr.length,this.decArr.length]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My Months Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep","Oct","Nov","Dec"]
      }
  }
  }
  
  
  getPendingData(){

    let d:any=new Date().toISOString().split('T')[0]  
    this.authData.date= d;
    this.appointment.getAppointMent(this.authData).subscribe((result:any)=>{
      this.appointmentPendingArr = result.data
    })
  }
  getTodayAmount(){
        this.appointment.getDoctorDetail(this.authData).subscribe((result:any)=>{
        this.doctorArr = result.data
        })
  }
}
