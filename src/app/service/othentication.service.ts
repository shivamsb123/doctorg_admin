import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders().set(
  'Accept',
  'multipart/form-data; charset=utf-8'
);

const USER_KEY = 'user';
@Injectable({
  providedIn: 'root',
})
export class OthenticationService implements HttpInterceptor {
  // common = "http://localhost:8080/";
  // common = "http://44.203.159.238:8080/";
  common = environment.url;

  private permissions = new BehaviorSubject('');
  availablePermissions = this.permissions.asObservable();

  constructor(private http: HttpClient) {}
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

  login(data: any): Observable<any> {
    return this.http.post(this.common + 'admin/login', data);
  }

  userLogin(data: any): Observable<any> {
    return this.http.post(this.common + 'user/login', data);
  }

  // saveAuthData(token: string) {
  //   localStorage.setItem("token", token);
  // }

  isLogesIn() {
    return localStorage.getItem('token') != null;
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
  }

  changePassword(id: any, data: any): Observable<any> {
    return this.http.post(this.common + 'admin/changepassword' + id, data);
  }

  getProfile(): Observable<any> {
    return this.http.get(this.common + 'admin/getProfile');
  }

  updateprofile(id: any, data: any): Observable<any> {
    return this.http.post(this.common + 'admin/update' + '/' + id, data);
  }

  getAdminDashBoardData(params:any): Observable<any> {
    return this.http.post(this.common + 'admin/dashboardData', params);
  }

  getPermissions(): Observable<any> {
    return this.http.get(this.common + 'permission/getall');
  }
  // createTarget(data:any){
  //   return this.http.post(this.common + 'panchayat/updatetarget',data);
  // }
  doctorLogin(data:any){
    return this.http.post(this.common + 'doctor/login',data);

  }
  public setPermissions(perm:any){
    this.permissions = perm;
  };
}
