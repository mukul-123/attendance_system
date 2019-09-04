import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes, Router } from "@angular/router";

import { AdminHeaderComponent } from "./header/admin-header/admin-header.component";
import { PageNotFoundComponent } from "./views/page-not-found/page-not-found.component";
import { AdminLoginComponent } from "./views/admin-login/admin-login.component";
import { TeacherLoginComponent } from "./views/teacher-login/teacher-login.component";
import { AdminDashboardComponent } from "./views/admin-dashboard/admin-dashboard.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { AuthService } from './services/auth.service';
import { AddStudentComponent } from './views/add-student/add-student.component';
import { ClassComponent } from './views/class/class.component';
import { StudentClassComponent } from './views/student-class/student-class.component';
import { TeacherListComponent } from './views/teacher-list/teacher-list.component';
import { AddTeacherComponent } from './views/add-teacher/add-teacher.component';
import { TeacherDashboardComponent } from './views/teacher/teacher-dashboard/teacher-dashboard.component';
import { AdminProfileComponent } from './views/admin-profile/admin-profile.component';
import { StudentAttendanceComponent } from './views/student-attendance/student-attendance.component';

export const routes: Routes = [
  {
    path: "admin",
    children: [
      {
        path: "login",
        component: AdminLoginComponent,
        canActivate: [AuthService]
      },
      {
        path: "dashboard",
        component: AdminDashboardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "profile",
        component: AdminProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "class",
        component: ClassComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "student",
        component: AddStudentComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "student_class/:class_id",
        component: StudentClassComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "teachers",
        component: TeacherListComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "addTeacher",
        component: AddTeacherComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "attendance",
        component: StudentAttendanceComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: "**",
        component: PageNotFoundComponent
      }
    ]
  },
  {
    path: "teacher",
    children: [
      {
        path: "login",
        component: TeacherLoginComponent
      },
      {
        path: "login/:token",
        component: TeacherLoginComponent
      },
      {
        path: "dashboard",
        component: TeacherDashboardComponent
      },
      {
        path: "**",
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
