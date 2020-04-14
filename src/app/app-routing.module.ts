import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './main/courses/courses.component';
import { AddCoursesComponent } from './main/add-courses/add-courses.component';
import { CoursesDetailsComponent } from './main/courses-details/courses-details.component';
import { EditCoursesComponent } from './main/edit-courses/edit-courses.component';
import { AuthGuard } from "./auth/auth.guard";




const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    data: { title: 'List of Courses' }
  },
  {
    path: 'courses-details/:id',


    component: CoursesDetailsComponent,
    data: { title: 'Courses Details' }
  },
  {
    path: 'add-courses',
    component: AddCoursesComponent,
    canActivate: [AuthGuard],

    data: { title: 'Add Courses' }
  },
  {
    path: 'edit-courses/:id',
    component: EditCoursesComponent,
    canActivate: [AuthGuard],

    data: { title: 'Edit Courses' }
  },

  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },

  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
