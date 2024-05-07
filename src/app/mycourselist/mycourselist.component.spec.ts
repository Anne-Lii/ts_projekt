import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycourselistComponent } from './mycourselist.component';

describe('MycourselistComponent', () => {
  let component: MycourselistComponent;
  let fixture: ComponentFixture<MycourselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycourselistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
