import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerPendingInstructionsComponent } from './checker-pending-instructions.component';

describe('CheckerPendingInstructionsComponent', () => {
  let component: CheckerPendingInstructionsComponent;
  let fixture: ComponentFixture<CheckerPendingInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerPendingInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerPendingInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
