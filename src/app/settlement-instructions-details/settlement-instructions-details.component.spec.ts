import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementInstructionsDetailsComponent } from './settlement-instructions-details.component';

describe('SettlementInstructionsDetailsComponent', () => {
  let component: SettlementInstructionsDetailsComponent;
  let fixture: ComponentFixture<SettlementInstructionsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementInstructionsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementInstructionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
