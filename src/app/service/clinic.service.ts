import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  constructor(private http: HttpClient) { }
  httpOptions = {};
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = '';
    let jwttoken = req.clone({
      setHeaders: {
        'x-access-token': token,
      },
    });
    return next.handle(jwttoken);
  }


  createDoctor(data: any): Observable<any> {
    return this.http.post(baseUrl + 'doctor/create', data);
  }
  getClinicAllData():Observable<any>{
    return this.http.get(baseUrl + 'clinic/getAll');
  }
  getDoctor(data):Observable<any>{
    return this.http.post(baseUrl + 'doctor/getClinicDoctor',data);
  }
  deleteDoctorById(data){
    return this.http.delete(baseUrl + 'doctor/delete/'+data.id);
  }
  getDoctorDataById(data):Observable<any>{
    return this.http.get(baseUrl + 'doctor/getById/'+data.id);
  }
  updateDoctor(data):Observable<any>{
    return this.http.put(baseUrl + 'doctor/update',data);
  }
  getDoctorByClinicId(data):Observable<any>{
    return this.http.post(baseUrl + 'doctor/getDoctorByClinicId',data);
  }
  getPatientByClinicId(data):Observable<any>{
    return this.http.post(baseUrl + 'doctor/getClinicTotalPatient',data);
  }
  getPendingAppointment(data):Observable<any>{
    return this.http.post(baseUrl + 'doctor/getClinicPendingAppointment',data);
  }
  bookAppointment(data):Observable<any>{
    return this.http.post(baseUrl + 'patient/clinicBookAppointment',data);
  }
  getAppointmentData(data):Observable<any>{
    return this.http.post(baseUrl + 'doctor/getAppointmentByDoctor',data);
  }
  deletePateintById(data):Observable<any>{
    return this.http.delete(baseUrl + 'clinic/deleteAppointment/'+ data.id);
  }
  getFollowUp(data) :Observable<any>{
    return this.http.post(baseUrl + 'patient/getFolloup', data);
  }
  patientLogin(data):Observable<any>{
    return this.http.post(baseUrl + 'patient/patientLogin', data);
  }
  getPendingAppointmentById(id):Observable<any>{
    return this.http.get(baseUrl + 'patient/getPatientAppointment/' + id);
  }
  getPateintDetail(id):Observable<any>{
    return this.http.get(baseUrl + 'patient/getPatient/' + id);

  }
}
