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
import jwt_decode from 'jwt-decode';

const headers = new HttpHeaders().set(
  'Accept',
  'multipart/form-data; charset=utf-8'
);

const USER_KEY = 'user';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

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


  getAuthUser(){
    if(localStorage.getItem('token')){
      let token =localStorage.getItem('token');
      try {
        return jwt_decode(token);
      } catch(Error) {
        return null;
      }
    }
  }
  createClinic(data: any): Observable<any> {
    return this.http.post(baseUrl + 'clinic/create', data);
  }
  getClinicAllData():Observable<any>{
    return this.http.get(baseUrl + 'clinic/getAll');
  }
  updateActiveStatus(data):Observable<any>{
    return this.http.post(baseUrl + 'clinic/activeStatusUpdate',data);
  }
  deleteClinicById(data): Observable<any>{
    return this.http.delete(baseUrl + 'clinic/delete/'+data.id);
  }
  getClinicById(data){
    return this.http.get(baseUrl + 'clinic/getById/'+data.id);
  }
  updateClinic(data){
    return this.http.put(baseUrl + 'clinic/update',data);
  }


  createBlog(data: any): Observable<any> {
    return this.http.post(baseUrl + 'patient/createBlog', data);
  }
  UpdateBlog(data: any): Observable<any> {
    return this.http.put(baseUrl + 'patient/updateBlog', data);
  }
  getBlog():Observable<any>{
    return this.http.get(baseUrl + 'patient/getBlog');
  }
  DeleteBlog(id: any):Observable<any>{
    return this.http.delete(baseUrl + 'patient/deleteBlog/'+id);
  }

  getBlogById(id):Observable<any>{
    return this.http.get(baseUrl + 'patient/getBlogById/'+id);
  }
  getContactList():Observable<any>{
    return this.http.get(baseUrl + 'patient/getAllContact');

  }
}
