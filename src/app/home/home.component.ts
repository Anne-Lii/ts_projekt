import { Component } from '@angular/core';
import { CourseInterface } from '../model/course-interface';
import { CoursedataService } from '../services/coursedata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  courselist: CourseInterface[] = [];//Array to store list with courses
  uniqueSubjects: string[] = [];//Array to store uniqu subjects
  filteredCount: number = 0;//filteredCount set to 0

  constructor(private coursedataservice: CoursedataService) { }

  //subscribe to the getCourses method
  ngOnInit() {
    this.coursedataservice.getCourses().subscribe(data => {
      this.courselist = data;

      this.extractUniqueSubjects();//calls function to extract unique subjects
      this.filteredCount = this.courselist.length;//Initially set filteredCount to total number of courses
    })
  }

  //function to extract unique subjects from courses
  extractUniqueSubjects(): void {
    this.uniqueSubjects = Array.from(new Set(this.courselist.map(course => course.subject)));
  }

  //function to filter courses from selected subject
  filterCoursesBySubject(event: any): void {
    const selectedSubject = event.target.value;
    if (!selectedSubject) {
      this.coursedataservice.getCourses().subscribe(data => {
        this.courselist = data;
        this.filteredCount = this.courselist.length;//update filteredCount to total number of courses
      });
    } else {
      this.coursedataservice.getCourses().subscribe(data => {
        this.courselist = data.filter(course => course.subject === selectedSubject);
        this.filteredCount = this.courselist.length; //Update filteredCount to number of filtered courses
      });
    }
  }
}
