import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsThemeComponent } from './forms-theme/forms-theme.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { TokenInterceptor } from './service/tokenInterceptors';
import { DatePipe } from '@angular/common';
import { OthenticationService } from './service/othentication.service';
//import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthInterceptor } from './auth.interceptor';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component'
import { ToastrModule } from 'ngx-toastr';

import { RoleListComponent } from './role-list/role-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RolepermissionComponent } from './rolepermission/rolepermission.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { TaggedImgPopupComponent } from './shared/tagged-img-popup/tagged-img-popup.component';

import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CreateClinicComponent } from './create-clinic/create-clinic.component';
import { ClinicSidenavbarComponent } from './clinic-sidenavbar/clinic-sidenavbar.component';
import { ClinicHeaderComponent } from './clinic-header/clinic-header.component';
import { ClinicDashboardComponent } from './clinic-dashboard/clinic-dashboard.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorSidenavbarComponent } from './doctor/doctor-sidenavbar/doctor-sidenavbar.component';
import { DoctorHeaderComponent } from './doctor/doctor-header/doctor-header.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
// import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { AppointmentComponent } from './doctor/appointment/appointment.component';
import { NavbarComponent } from './doctor/navbar/navbar.component';
import { DiagnosisComponent } from './doctor/diagnosis/diagnosis.component';
import { ChiefComplaintComponent } from './doctor/chief-complaint/chief-complaint.component';
import { InvestigationComponent } from './doctor/investigation/investigation.component';
import { SeComponent } from './doctor/se/se.component';
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
import { AuthGuard } from './service/auth.guard';
import { CompleteAppointmentListComponent } from './doctor/complete-appointment-list/complete-appointment-list.component';
import { TotalDoctorComponent } from './clinic/total-doctor/total-doctor.component';
import { TotalPateintComponent } from './clinic/total-pateint/total-pateint.component';
import { TotalAppointmentComponent } from './clinic/total-appointment/total-appointment.component'
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

import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    FormsThemeComponent,
    NewDashboardComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    RoleListComponent,
    UserLoginComponent,
    RolepermissionComponent,
    TaggedImgPopupComponent,
    CreateClinicComponent,
    ClinicSidenavbarComponent,
    ClinicHeaderComponent,
    ClinicDashboardComponent,
    DoctorListComponent,
    CreateDoctorComponent,
    DoctorLoginComponent,
    DoctorSidenavbarComponent,
    DoctorHeaderComponent,
    DoctorDashboardComponent,
    AppointmentComponent,
    NavbarComponent,
    DiagnosisComponent,
    ChiefComplaintComponent,
    InvestigationComponent,
    SeComponent,
    EnterDiseaseComponent,
    MedicineComponent,
    CreatePrescriptionComponent,
    DiagnosisListComponent,
    ChiefComplaintListComponent,
    InvestigationListComponent,
    SeListComponent,
    EnterDiseaseListComponent,
    MedicineListComponent,
    PatientHistoryComponent,
    ViewHistoryComponent,
    CompleteAppointmentListComponent,
    TotalDoctorComponent,
    TotalPateintComponent,
    TotalAppointmentComponent,
    TodayEarningListComponent,
    TotalEarningPateintComponent,
    AllDoctorListComponent,
    TotalAapointmentListComponent,
    TestComponent,
    TestMasterComponent,
    TestBillingComponent,
    BookAppointmentComponent,
    DayBookComponent,
    BlogComponent,
    AddBlogComponent,
    ContactListComponent,
    PendingAppointmentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    BsDatepickerModule.forRoot(),
    NgxMaterialTimepickerModule,
    MatRadioModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
        //MatFormFieldModule
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [OthenticationService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
