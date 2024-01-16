import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders().set(
  'Accept',
  'multipart/form-data; charset=utf-8'
);

const USER_KEY = 'user';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class DistrictService {
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

  createUser(data: any): Observable<any> {
    return this.http.post(baseUrl + 'user/singup', data);
  }

  showUser(): Observable<any> {
    return this.http.get(baseUrl + 'user/getall');
  }

  distictList(): Observable<any> {
    return this.http.get(baseUrl + 'distric/getall');
  }

  subDistictList(): Observable<any> {
    return this.http.get(baseUrl + 'subdistric/getall');
  }

  //  getByDisctricId/

  subDistictListByids(id: any): Observable<any> {
    return this.http.post(baseUrl + 'subdistric/getByDisctricId' ,id);
  }
  subDistictListByid(id: any): Observable<any> {
    return this.http.get(baseUrl + 'subdistric/getByDisctricId' +'/'+id);
  }

  createRole(data: any): Observable<any> {
    return this.http.post(baseUrl + 'role/save', data);
  }

  roleList(): Observable<any> {
    return this.http.get(baseUrl + 'role/getall');
  }

  updateRole(id: any, data: any): Observable<any> {
    return this.http.post(baseUrl + 'role/update' + '/' + id, data);
  }

  panchyatList(id: any): Observable<any> {
    return this.http.get(baseUrl + 'panchayat/getById/' + id);
  }

  villagesList(): Observable<any> {
    return this.http.get(baseUrl + 'panchayat/getAllVillage');
  }
  getVillageList(id: any): Observable<any> {
    return this.http.get(baseUrl + 'panchayat/getByPanchayatId/' + id);
  }

  resouceList(): Observable<any> {
    return this.http.get(baseUrl + 'permission/getall');
  }
  getRoleById(id) {
    return this.http.get(baseUrl + 'role/get/' + id);
  }
  permissionListByRoleId(roleId) {
    return this.http.get(baseUrl + 'roleHashpemisson/permission/' + roleId);
  }
  listPermisssion() {
    return this.http.get('permission/groupbylist');
  }
  createPermission(data) {
    return this.http.post(baseUrl + 'roleHashpemisson/save', data);
  }

  getProfileUser(id: any): Observable<any> {
    return this.http.get(baseUrl + 'user/getProfile/' + id);
  }
  getSubDistrictList(id: any) {
    return this.http.get(baseUrl + 'subdistric/getByDisctricId/' + id);
  }
  updateUeser(id: any, data: any): Observable<any> {
    return this.http.post(baseUrl + 'user/update/' + id, data);
  }

  createBlock(data) {
    return this.http.post(baseUrl + 'subdistric/save', data);
  }

  createGramPanchayat(data) {
    return this.http.post(baseUrl + 'panchayat/save', data);
  }

  //panchayat by id
  panchayatListByid(id: any): Observable<any> {
    return this.http.get(baseUrl + 'panchayat/getById' + '/' + id);
  }
  instituesList(data: any, size: any, page: any): Observable<any> {
    return this.http.post(
      baseUrl + 'admin/getallinstitues/' + size + '/' + page,
      data
    );
  }
  getAdvancedAllInstitutes(data: any, size: any, page: any): Observable<any> {
    return this.http.post(
      baseUrl + 'admin/getAdvancedAllInstitutes/' + size + '/' + page,
      data
    );
  }
  villagePanchayat(data): Observable<any> {
    return this.http.post(baseUrl + 'panchayat/createVillage', data);
  }

  getAllAssets(page: any, data): Observable<any> {
    return this.http.post(baseUrl + 'admin/gellassets/' + page, data);
  }
  getAllHousehold(data: any): Observable<any> {
    return this.http.post(baseUrl + 'admin/getallhousehold', data);
  }
  getAllHouseholdVillageId(id: any,type,size,page): Observable<any> {
    return this.http.get(baseUrl + 'admin/getallhousehold/' + id+"/"+type+"/"+size+"/"+page);
  }
  
  getAllInstituteByVillageId(id: any,size,page): Observable<any> {
    return this.http.get(baseUrl + 'admin/viewinstitutedetails/' + id+"/"+size+"/"+page);
  }
  getAllHouseholdAdvancedReport(data: any): Observable<any> {
    return this.http.post(
      baseUrl + 'admin/getAllHouseholdAdvancedReport',
      data
    );
  }

  getAssetsAdvancedReport(data: any): Observable<any> {
    return this.http.post(
      baseUrl + 'admin/assetsAdvance',
      data
    );
  }
}
