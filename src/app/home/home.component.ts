
import { Component } from '@angular/core';
import { CourseInterface } from '../model/course-interface';
import { CoursedataService } from '../services/coursedata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../services/timetable.service';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor() { }

  

}
