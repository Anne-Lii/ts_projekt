import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;

  @Output() pageChange = new EventEmitter<number>();

  goToFirstPage() {
    this.pageChange.emit(1); // Go to first page
  }  

  prevPage() {
    if(this.currentPage > 1) {
      this.pageChange.emit(this.currentPage-1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });//scrolls up to the top of the page
  }

  nextPage() {
    if(this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage+1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });//scrolls up to the top of the page
  }

  goToLastPage() {
    this.pageChange.emit(this.totalPages); //Go to last page
  }

}
