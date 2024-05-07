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

  courselist: CourseInterface[] = [];

  constructor(private coursedataservice: CoursedataService) {}

  ngOnInit() {
    this.coursedataservice.getCourses().subscribe(data => {
      this.courselist = data;
    })
  }
}
