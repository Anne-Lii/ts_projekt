import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseInterface } from '../model/course-interface';

@Injectable({
  providedIn: 'root'
})
export class CoursedataService {
  private url:string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";
  
  //dependencie injection http client
  constructor(private http: HttpClient) { } 
  
  //method to get courses with http client
  getCourses(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(this.url);//http call
  }
}
