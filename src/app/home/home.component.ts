import { Component } from '@angular/core';
import { CourseInterface } from '../model/course-interface';
import { CoursedataService } from '../services/coursedata.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { TimetableService } from '../services/timetable.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  originalCourselist: CourseInterface[] = [];//store the original list of courses
  courselist: CourseInterface[] = [];//Array to store list with courses
  uniqueSubjects: string[] = [];//Array to store unique subjects
  filteredCount: number = 0;//number of courses set to 0
  searchInput: string = "";//empty string for searchinput
  currentSortColumn: keyof CourseInterface = "courseCode"; //starting with courseCode sorted
  isSortAscending: boolean = true;//sortingdirection
  currentPage: number = 1;//starting on page 1
  totalPages: number = 44;//how many pages
  pageSize: number = 100;//number of courses on every page
  totalCourses: number = 0;//total number of courses

  constructor(
    private coursedataservice: CoursedataService, //inject coursedataservie
    private timeTableService: TimetableService //inject timetableservice
  ) { }

  //subscribe to the getCourses method
  ngOnInit() {
    this.coursedataservice.getCourses().subscribe(data => {
      this.courselist = data;//Initialize courselist with data from jsonfile
      this.originalCourselist = [...this.courselist];// Initialize originalCourselist
      this.extractUniqueSubjects();//calls function to extract unique subjects
      this.filteredCount = this.courselist.length;// sets filteredCount to total number of courses
      this.totalCourses = data.length;//set number of totalcourses
      this.totalPages = Math.ceil(this.totalCourses / this.pageSize);//how many pages
      this.updateDisplayedCourses();
    });
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
  }

  // Function to reset courselist to its original state
  resetCourses(): void {
    this.courselist = [...this.originalCourselist];
    this.filteredCount = this.courselist.length;
  }

  //function to sort courses based on selected headline
  sortCourses(column: keyof CourseInterface): void {

    this.courselist.sort((a, b) => {

      //get values from selected column
      const valueA = a[column];
      const valueB = b[column];

      //sorting order based on current sorting direction
      const sortOrder = this.isSortAscending ? 1 : -1;

      //compare and return result based on sort direction
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

  updateDisplayedCourses() {
    // index on first and last course that shows on the page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalCourses);
    
    // get courses for this page
    this.courselist = this.originalCourselist.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
       this.currentPage = page;
    this.updateDisplayedCourses();  
  }
}
