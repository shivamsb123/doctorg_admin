import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl= environment.url

  constructor(private http:HttpClient) { }

getAppointMent(data): Observable<any>{
  return this.http.post(this.baseUrl +'doctor/getAppointment',data)
}
sendCompleteAppointment(data): Observable<any>{
  return this.http.post(this.baseUrl +'doctor/appointmentComplete',data)
}
getAllCompleteAppointment(data): Observable<any>{
  // console.log(data)
return this.http.post(this.baseUrl + 'doctor/getAppointmentComplete',data)
}
todayEarning(data): Observable<any>{
  return this.http.post(this.baseUrl + 'doctor/updateTodayAmount',data)
}
getDoctorDetail(data): Observable<any>{
  return this.http.post(this.baseUrl + 'doctor/getDoctorByid',data)
}
deleteAppointmentById(id): Observable<any>{
  return this.http.delete(this.baseUrl + 'doctor/deleteAppointment/'+id)

}

}
