import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CourseInterface } from '../model/course-interface';
import { TimetableService } from '../services/timetable.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {

myCourses: CourseInterface[] = [];//empty array to store my courses

constructor(private timeTableService: TimetableService) {}

ngOnInit(): void {
  this.myCourses = this.timeTableService.getMyCourses();
}

  
removeCourse(course: CourseInterface): void {
  this.timeTableService.removeFromMyCourses(course.courseCode);
  this.myCourses = this.timeTableService.getMyCourses();
}
  

}
