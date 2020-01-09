import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCommentComponent } from './trip-comment.component';

describe('TripCommentComponent', () => {
  let component: TripCommentComponent;
  let fixture: ComponentFixture<TripCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
