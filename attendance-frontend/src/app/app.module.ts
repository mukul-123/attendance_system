import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { HttpModule, Headers, RequestOptions } from "@angular/http";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatCardModule} from '@angular/material';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AdminHeaderComponent } from "./header/admin-header/admin-header.component";
import { routes } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./views/page-not-found/page-not-found.component";
import { AdminLoginComponent } from "./views/admin-login/admin-login.component";
import { TeacherLoginComponent } from "./views/teacher-login/teacher-login.component";
import { RequestInterceptorService } from "./services/interceptor/request-interceptor.service";
import { AdminDashboardComponent } from "./views/admin-dashboard/admin-dashboard.component";
import { AddStudentComponent } from "./views/add-student/add-student.component";
import { ClassModalComponent } from "./modal/class-modal/class-modal.component";
// import { NgbModalBackdrop } from "@ng-bootstrap/ng-bootstrap/modal/modal-backdrop";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassComponent } from './views/class/class.component';
import { StudentClassComponent } from './views/student-class/student-class.component';
import { TeacherListComponent } from './views/teacher-list/teacher-list.component';
import { AddTeacherComponent } from './views/add-teacher/add-teacher.component';
import { TeacherDashboardComponent } from './views/teacher/teacher-dashboard/teacher-dashboard.component';
import { AdminProfileComponent } from './views/admin-profile/admin-profile.component';
import { StudentAttendanceComponent } from './views/student-attendance/student-attendance.component';
import { AttendanceModalComponent } from './modal/attendance-modal/attendance-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    PageNotFoundComponent,
    AdminLoginComponent,
    TeacherLoginComponent,
    AdminDashboardComponent,
    AddStudentComponent,
    ClassModalComponent,
    ClassComponent,
    StudentClassComponent,
    TeacherListComponent,
    AddTeacherComponent,
    TeacherDashboardComponent,
    AdminProfileComponent,
    StudentAttendanceComponent,
    AttendanceModalComponent
  ],
  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule
  ],
  entryComponents: [
    ClassModalComponent,
    AttendanceModalComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    // NgbModalBackdrop
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
