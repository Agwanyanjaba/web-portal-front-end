import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementInstructionsComponent } from './settlement-instructions.component';

describe('SettlementInstructionsComponent', () => {
  let component: SettlementInstructionsComponent;
  let fixture: ComponentFixture<SettlementInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
