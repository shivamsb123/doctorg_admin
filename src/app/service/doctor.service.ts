import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
baseUrl = environment.url

  constructor(private http:HttpClient) { }

  addDiagnosis(data:any):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/diagnosis',data)
  }
  getDiagnosis(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/getAllDiagnosis',data)
  }
  addchiefComplaint(data:any):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/addChiefComplaint',data)
  }
  getAllChief(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/getALLChiefComplaint',data)
  }
  addinvestigation(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/addInvestigation',data)
  }
  getInvestigation(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/getAllInvestigation',data)
  }
  addSE(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/addSE',data)
  }
  getSEData(data):Observable<any>{
    console.log(data)
    return this.http.post(this.baseUrl +'doctor/getAllSE',data)
  }
  addDesease(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/addDisease',data)
  }
  getDesease(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/getAllDisease',data)
  }
  addMedicine(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/addMedicine',data)
  }
  getMedicine(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/getAllMedicine',data)
  }
  deleteDiagnosisById(id){
    return this.http.delete(this.baseUrl + 'doctor/deleteDiagnosis/'+ id)
  }
  getAllMedicineBYDisease(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/getAllMedicineBydisease',data)
  }
  addPrescription(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/addPrescriptionData',data)
  }
  priscriptionFile(data):Observable<any>{
    return this.http.post(this.baseUrl +'doctor/prescriptionUpload',data)
  }
  deleteChiefById(id):Observable<any>{
    return this.http.delete(this.baseUrl + 'doctor/deleteChiefComplaint/'+ id)
  }
  deleteInvestigationById(id):Observable<any>{
    return this.http.delete(this.baseUrl + 'doctor/deleteInvestigation/' +id)
  }
  deleteSeById(id):Observable<any>{
    return this.http.delete(this.baseUrl + 'doctor/deleteSe/' + id)
  }
  deleteDiseaseById(id):Observable<any>{
    return this.http.delete(this.baseUrl + 'doctor/deleteDisease/' + id)
  }
  updateDiagnosis(data):Observable<any>{
    return this.http.put(this.baseUrl + 'doctor/updateDiagnosis',data)
  }
  updateChiefComplaint(data):Observable<any>{
    return this.http.put(this.baseUrl + 'doctor/updateChiefComplaint',data)
  }
  updateInvestigation(data):Observable<any>{
    return this.http.put(this.baseUrl + 'doctor/updateInvestigation',data)
  }
  updateSe(data):Observable<any>{
    return this.http.put(this.baseUrl + 'doctor/updateSe',data)
  }
  updateDisease(data):Observable<any>{
    return this.http.put(this.baseUrl + 'doctor/updateDisease',data)
  }
  deleteMedicineById(id):Observable<any>{
    return this.http.delete(this.baseUrl +'doctor/deleteMedicine/'+id)
  }
  updateMedicine(data):Observable<any>{
    return this.http.put(this.baseUrl + 'doctor/updateMedicine',data)
  }
  updateTiming(data):Observable<any>{
    return this.http.put(this.baseUrl + 'doctor/updateTiming',data)
  }
  getPatientProfile(data):Observable<any>{
    return this.http.get(this.baseUrl +'patient/getPatient/' + data.patient_id)
  }
  getPrescription(data):Observable<any>{
    return this.http.post(this.baseUrl + 'doctor/getAllprescriptionById',data)
  }
  getPrescriptionHistory(data):Observable<any>{
    return this.http.post(this.baseUrl + 'doctor/getPrescriptionHistory',data)
  }
  getTodayEarningList(data):Observable<any>{
    return this.http.post(this.baseUrl + 'doctor/getAppointmentCompleteToday',data)
  }
  getAllDoctorList():Observable<any>{
    return this.http.get(this.baseUrl + 'doctor/getall')
  }
  getAllAppointment():Observable<any>{
    return this.http.get(this.baseUrl + 'doctor/getTotalAppointment')
  }
  getAllAppointmentBYClinic(data):Observable<any>{
    return this.http.get(this.baseUrl + 'doctor/getTotalAppointmentBYClinic/'+data.clinic_id)
  }
  getPatietReport(data):Observable<any>{
    return this.http.get(this.baseUrl +'patient/getPatientReport/' + data.id)
  } 
  addTest(data):Observable<any>{
    return this.http.post(this.baseUrl +'test/addTest',data)
  }
  getAllTest():Observable<any>{
    return this.http.get(this.baseUrl +'test/getAllTest')
  }
  addTestBilling(data):Observable<any>{
    return this.http.post(this.baseUrl +'test/addBilling',data)
  }
  updateTestBilling(data):Observable<any>{
    return this.http.put(this.baseUrl +'test/updateBilling',data)
  }
  sendFromToDate(data){
    return this.http.post(this.baseUrl +'test/getAppointmentFromTo',data)
  }
  getDoctorByClinicId(data):Observable<any>{
    return this.http.post(this.baseUrl + 'doctor/getDoctorByClinicId',data);
  }
}
