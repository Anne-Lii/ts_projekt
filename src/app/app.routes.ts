/* include components */
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CourselistComponent } from './courselist/courselist.component';

/* routes */
export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "courselist", component: CourselistComponent},
    {path: "mycourses", component: MyCoursesComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**",  component: HomeComponent}
];
