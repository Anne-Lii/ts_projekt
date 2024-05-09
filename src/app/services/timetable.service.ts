import { Injectable } from '@angular/core';
import { CourseInterface } from '../model/course-interface';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private readonly localStorageKey = "schedule"; //key to store timetable

  constructor() { }

  // function to get timetable from localstorage
  getMyCourses(): CourseInterface[] {
    const storedTimetable = localStorage.getItem(this.localStorageKey);
    return storedTimetable ? JSON.parse(storedTimetable) : [];
  }

  // function to add a course to timetable
  addToMyCourses(course: CourseInterface): void {
    let schedule: CourseInterface[] = this.getMyCourses();
    if (!schedule.some(c => c.courseCode === course.courseCode)) {
      schedule.push(course);
      localStorage.setItem(this.localStorageKey, JSON.stringify(schedule));
    }
  }
  // function to remove a course from timetable
  removeFromMyCourses(courseCode: string): void {
    let schedule: CourseInterface[] = this.getMyCourses();
    const index = schedule.findIndex(c => c.courseCode === courseCode);
    if (index !== -1) {
      schedule.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(schedule));
    }
  }

}