import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripImgDialogComponent } from './trip-img-dialog.component';

describe('TripImgDialogComponent', () => {
  let component: TripImgDialogComponent;
  let fixture: ComponentFixture<TripImgDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripImgDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripImgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
