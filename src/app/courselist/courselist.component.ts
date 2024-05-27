
import { Component } from '@angular/core';
import { CourseInterface } from '../model/course-interface';
import { CoursedataService } from '../services/coursedata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../services/timetable.service';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-courselist',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './courselist.component.html',
  styleUrl: './courselist.component.css'
})
export class CourselistComponent {

  originalCourselist: CourseInterface[] = [];//store the original list of courses
  courselist: CourseInterface[] = [];//Array to store list with courses
  uniqueSubjects: string[] = [];//Array to store unique subjects
  filteredCount: number = 0;//number of courses set to 0
  searchInput: string = "";//empty string for searchinput
  currentSortColumn: keyof CourseInterface = "courseCode"; //starting with courseCode sorted
  isSortAscending: boolean = true;//sortingdirection  
  totalLength: number = 0;
  page: number = 1;//start on page one


  constructor(
    private coursedataservice: CoursedataService, //inject coursedataservie
    private timeTableService: TimetableService, //inject timetableservice

  ) { }

  //subscribe to the getCourses method
  ngOnInit() {
    this.coursedataservice.getCourses().subscribe(data => {
      this.originalCourselist = data; // Initialize originalCourselist
      this.updateDisplayedCourses();
    });
  }

  filterCoursesBySubject(event: any): void {
    const selectedSubject = event.target.value;
    if (!selectedSubject || selectedSubject === "all") {
      this.resetCourses();
    } else {
      this.courselist = this.originalCourselist.filter(course => course.subject === selectedSubject);
      this.filteredCount = this.courselist.length;
      this.totalLength = this.courselist.length; // Uppdatera totalLength med längden på den filtrerade listan
    }
    this.page =1; //reset page to page one
  }

  //function to search from searchinput
  searchCourses(): void {
    if (this.searchInput.trim() === "") {
      this.resetCourses();
      return;
    }

    this.courselist = this.originalCourselist.filter(course =>
      course.courseCode.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      course.subject.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    this.filteredCount = this.courselist.length;
    this.extractUniqueSubjects();
  }

  // Function to reset courselist to its original state
  resetCourses(): void {
    this.courselist = [...this.originalCourselist];
    this.filteredCount = this.courselist.length;
    this.totalLength = this.courselist.length;
    this.extractUniqueSubjects(); // Update unique subjects to include all courses

    this.page =1; //reset page to page one
  }


  //function to sort courses based on selected headline
  sortCourses(column: keyof CourseInterface): void {
    this.courselist.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      const sortOrder = this.isSortAscending ? 1 : -1;

      if (valueA < valueB) {
        return -1 * sortOrder;
      } else if (valueA > valueB) {
        return 1 * sortOrder;
      } else {
        return 0;
      }
    });

    this.courselist.reverse();
    this.isSortAscending = !this.isSortAscending;
  }

  //call addToMyCourses from timetable service
  addToMyCourses(course: CourseInterface): void {
    this.timeTableService.addToMyCourses(course);
  }
  extractUniqueSubjects(): void {
    this.uniqueSubjects = Array.from(new Set(this.courselist.map(course => course.subject)));
  }

  updateDisplayedCourses(): void {
    this.courselist = [...this.originalCourselist];
    this.filteredCount = this.courselist.length;
    this.extractUniqueSubjects();
  }

}
