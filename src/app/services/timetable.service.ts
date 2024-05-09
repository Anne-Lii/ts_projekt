import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private readonly localStorageKey = "schedule"; //key to store timetable

  constructor() { }

  //function to get timetable from localstorage
  getMyCourses():string[] {

    const storedTimetable = localStorage.getItem(this.localStorageKey);
    return storedTimetable ? JSON.parse(storedTimetable) : [];
  }

  //function to add a course to timetable
  addToMyCourses(courseCode:string): void {
    let schedule = this.getMyCourses();
    if (!schedule.includes(courseCode)) {
      schedule.push(courseCode);
      localStorage.setItem(this.localStorageKey, JSON.stringify(schedule));
    }
  }

  //function to remove courses from timetable
  removeFromMyCourses(courseCode:string): void {

    let schedule = this.getMyCourses();
    const index = schedule.indexOf(courseCode);

    if (index !== -1) {
      schedule.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(schedule));
    }
  }

  

}
