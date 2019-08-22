import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerPendingInstructionsComponent } from './maker-pending-instructions.component';

describe('MakerPendingInstructionsComponent', () => {
  let component: MakerPendingInstructionsComponent;
  let fixture: ComponentFixture<MakerPendingInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerPendingInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerPendingInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
