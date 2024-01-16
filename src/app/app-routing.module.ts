import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsThemeComponent } from './forms-theme/forms-theme.component';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AuthGuard } from './service/auth.guard';
import { RoleListComponent } from './role-list/role-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RolepermissionComponent } from './rolepermission/rolepermission.component';
import { CreateClinicComponent } from './create-clinic/create-clinic.component';
import { ClinicDashboardComponent } from './clinic-dashboard/clinic-dashboard.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { AppointmentComponent } from './doctor/appointment/appointment.component';
import { DiagnosisComponent } from './doctor/diagnosis/diagnosis.component';
import { ChiefComplaintComponent } from './doctor/chief-complaint/chief-complaint.component';
import { SeComponent } from './doctor/se/se.component';
import { InvestigationComponent } from './doctor/investigation/investigation.component';
import { EnterDiseaseComponent } from './doctor/enter-disease/enter-disease.component';
import { MedicineComponent } from './doctor/medicine/medicine.component';
import { CreatePrescriptionComponent } from './doctor/create-prescription/create-prescription.component';
import { DiagnosisListComponent } from './doctor/diagnosis-list/diagnosis-list.component';
import { ChiefComplaintListComponent } from './doctor/chief-complaint-list/chief-complaint-list.component';
import { InvestigationListComponent } from './doctor/investigation-list/investigation-list.component';
import { SeListComponent } from './doctor/se-list/se-list.component';
import { EnterDiseaseListComponent } from './doctor/enter-disease-list/enter-disease-list.component';
import { MedicineListComponent } from './doctor/medicine-list/medicine-list.component';
import { PatientHistoryComponent } from './doctor/patient-history/patient-history.component';
import { ViewHistoryComponent } from './doctor/view-history/view-history.component';
import { CompleteAppointmentListComponent } from './doctor/complete-appointment-list/complete-appointment-list.component';
import { TotalDoctorComponent } from './clinic/total-doctor/total-doctor.component';
import { TotalPateintComponent } from './clinic/total-pateint/total-pateint.component';
import { TotalAppointmentComponent } from './clinic/total-appointment/total-appointment.component';
import { TodayEarningListComponent } from './doctor/today-earning-list/today-earning-list.component';
import { TotalEarningPateintComponent } from './clinic/total-earning-pateint/total-earning-pateint.component';
import { AllDoctorListComponent } from './super-admin/all-doctor-list/all-doctor-list.component';
import { TotalAapointmentListComponent } from './super-admin/total-aapointment-list/total-aapointment-list.component';
import { TestComponent } from './doctor/test/test.component';
import { TestMasterComponent } from './doctor/test-master/test-master.component';
import { TestBillingComponent } from './doctor/test-billing/test-billing.component';
import { BookAppointmentComponent } from './clinic/book-appointment/book-appointment.component';
import { DayBookComponent } from './doctor/day-book/day-book.component';
import { BlogComponent } from './blog/blog.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ContactListComponent } from './super-admin/contact-list/contact-list.component';
import { PendingAppointmentComponent } from './clinic/pending-appointment/pending-appointment.component';
// import { DiagnosisListComponent } from './doctor/diagnosis-list/diagnosis-list.component';

const routes: Routes = [
  {path : '', component: LoginComponent, pathMatch: 'full'},

  {path : 'clinic-login', component:UserLoginComponent},
  {path : 'doctor-login', component:DoctorLoginComponent},

  {path : 'dashboard', canActivate:[AuthGuard] ,data: { roles: [1] },component:DashboardComponent},
  {path : 'doctor-dashboard', canActivate:[AuthGuard] , data: { roles: [3] },component:DoctorDashboardComponent},
  {path : 'appointment', canActivate:[AuthGuard], data: { roles: [3] },component:AppointmentComponent},
  // {path : 'dashboard', canActivate:[AuthGuard],component:DashboardComponent},
  {path : 'create-diagnosis', canActivate:[AuthGuard], data: { roles: [3] },component:DiagnosisComponent},
  {path: 'chief-complaint',canActivate:[AuthGuard], data: { roles: [3] },component:ChiefComplaintComponent},
  {path: 'se',canActivate:[AuthGuard], data: { roles: [3] },component:SeComponent},
  {path: 'investigation',canActivate:[AuthGuard], data: { roles: [3] },component:InvestigationComponent},
  {path: 'enter-disease',canActivate:[AuthGuard], data: { roles: [3] },component:EnterDiseaseComponent},
  {path: 'medicine',canActivate:[AuthGuard], data: { roles: [3] },component:MedicineComponent},
  {path: 'create-prescription',canActivate:[AuthGuard], data: { roles: [3] },component:CreatePrescriptionComponent},

  {path : 'clinic-dashboard',canActivate:[AuthGuard], data: { roles: [2] },component:ClinicDashboardComponent},
  {path : 'clinic-list', canActivate:[AuthGuard], data: { roles: [1] },component:NewDashboardComponent},
  {path : 'doctor-list',canActivate:[AuthGuard],  data: { roles: [2] },component:DoctorListComponent},
  {path : 'create-doctor', canActivate:[AuthGuard], data: { roles: [2] },component:CreateDoctorComponent},
  {path : 'create-doctor/:id', canActivate:[AuthGuard],data: { roles: [2] },component:CreateDoctorComponent},

  // {path : 'change-password', canActivate:[AuthGuard],component:ChangePasswordComponent},
  {path : 'edit', canActivate:[AuthGuard],data: { roles: [1] },component:UpdateProfileComponent},
  {path : 'edit/:id', canActivate:[AuthGuard],data: { roles: [1] },component:UpdateProfileComponent},
  {path : 'create-clinic/:id', canActivate:[AuthGuard],data: { roles: [1] },component:CreateClinicComponent},

  {path : 'create-clinic', canActivate:[AuthGuard],data: { roles: [1] },component:CreateClinicComponent},
  {path : 'role-list', canActivate:[AuthGuard],data: { roles: [1] },component:RoleListComponent},
  {path : 'rolepermission', canActivate:[AuthGuard],data: { roles: [1] },component:RolepermissionComponent},
  {path : 'diagnosis-list', canActivate:[AuthGuard],data: { roles: [3] },component:DiagnosisListComponent},
  {path : 'chief-complaint-list', canActivate:[AuthGuard],data: { roles: [3] },component:ChiefComplaintListComponent},
  {path : 'investigation-list', canActivate:[AuthGuard],data: { roles: [3] },component:InvestigationListComponent},
  {path : 'se-list', canActivate:[AuthGuard], data: { roles: [3] },component:SeListComponent},
  {path : 'disease-list', canActivate:[AuthGuard],data: { roles: [3] },component:EnterDiseaseListComponent},
  {path : 'medicine-list', canActivate:[AuthGuard],data: { roles: [3] },component:MedicineListComponent},

  {path : 'patient-history', canActivate:[AuthGuard],data: { roles: [3] },component:PatientHistoryComponent},
  {path : 'view-history', canActivate:[AuthGuard],data: { roles: [3] },component:ViewHistoryComponent},
  {path : 'complete-appointment-list', canActivate:[AuthGuard],data: { roles: [3] },component:CompleteAppointmentListComponent},
  // {path : 'appointment', canActivate:[AuthGuard],component:AppointmentComponent},
  {path : 'total-doctor',canActivate:[AuthGuard],data: { roles: [2] },component:TotalDoctorComponent},
  {path : 'total-pateint',canActivate:[AuthGuard],data: { roles: [2] },component:TotalPateintComponent},
  {path : 'total-appointment',canActivate:[AuthGuard],data: { roles: [2] },component:TotalAppointmentComponent},
  {path : 'today-list', canActivate:[AuthGuard],data: { roles: [3] },component:TodayEarningListComponent},
  {path : 'total-earning-pateint', canActivate:[AuthGuard],data: { roles: [2] },component:TotalEarningPateintComponent},
  {path : 'all-doctor-list', canActivate:[AuthGuard],data: { roles: [1] },component:AllDoctorListComponent},
  {path : 'all-appointment-list', canActivate:[AuthGuard],data: { roles: [1] },component:TotalAapointmentListComponent},
  {path : 'test',canActivate:[AuthGuard],data: { roles: [2] },component:TestComponent,},
  {path : 'test-master',canActivate:[AuthGuard],data: { roles: [2] },component:TestMasterComponent},
  {path : 'test-billing',canActivate:[AuthGuard],data: { roles: [2] },component:TestBillingComponent},
  {path : 'clinic-book-appointment', canActivate:[AuthGuard],data: { roles: [2] },component:BookAppointmentComponent},
  {path : 'blog',component:BlogComponent},
  {path : 'add-blog',component:AddBlogComponent},
  {path : 'edit-blog/:id',component:AddBlogComponent},
  {path : 'day-book',component:DayBookComponent},
  {path : 'day-book', canActivate:[AuthGuard],data: { roles: [3] },component:DayBookComponent},
  {path : 'contact-list', canActivate:[AuthGuard],data: { roles: [1] },component:ContactListComponent},
  {path : 'pending-appointment',canActivate:[AuthGuard], data: { roles : [2]},component:PendingAppointmentComponent}


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
