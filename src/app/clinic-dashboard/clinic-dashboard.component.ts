import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { ClinicService } from '../service/clinic.service';
import { SuperAdminService } from '../service/super-admin.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-clinic-dashboard',
  templateUrl: './clinic-dashboard.component.html',
  styleUrls: ['./clinic-dashboard.component.css']
})
export class ClinicDashboardComponent implements OnInit {
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

  authData: any;
  clinicrArr: any=[];
  pateintArr: any=[];
  pendingappointmentArr:any =[]
  isTotalSum: any=0
  isloading:boolean=true;

  constructor(public superAdminService:SuperAdminService,private clinic:ClinicService) {
    this.authData=this.superAdminService.getAuthUser()
    this.chartOptions = {
      series: [
        {
          name: "Pateint",
          data: [0,0,0,0,0,0,0,0,0,0]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My Months Pateint Chart"
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
    this.getDoctorListByClinicId();
   this.getPateintListByClinicId();
   this.getPendingAppointmentList();
  }
getDoctorListByClinicId(){
  this.clinic.getDoctorByClinicId(this.authData).subscribe((result:any)=>{
    this.isloading=false
    this.clinicrArr = result.data
    Promise.all(this.clinicrArr).then((values:any) => {
      values.forEach((currentValue, index) => {
      this.isTotalSum= parseInt(this.isTotalSum)+ parseInt(currentValue.total_amount)
      });
      
    });
  })
}
getPateintListByClinicId(){
  this.clinic.getPatientByClinicId(this.authData).subscribe((result:any)=>{
    this.pateintArr = result.data
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
        name: "Pateint",
        data: [this.janArr.length,this.febArr.length, this.marchArr.length, this.aprilArr.length, this.mayArr.length, this.junArr.length, this.julyArr.length, this.AugustArr.length,this.septArr.length,this.octArr.length,this.novArr.length,this.decArr.length]
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    title: {
      text: "My Months Pateint Chart"
    },
    xaxis: {
      categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep","Oct","Nov","Dec"]
    }
}
}

getPendingAppointmentList(){
  let d:any=new Date().toISOString().split('T')[0]  
    this.authData.date= d;
  this.clinic.getPendingAppointment(this.authData).subscribe((result:any)=>{
    this.pendingappointmentArr = result.data;
  })
}

}
