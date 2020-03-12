import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableLogsComponent } from './enable-logs.component';

describe('EnableLogsComponent', () => {
  let component: EnableLogsComponent;
  let fixture: ComponentFixture<EnableLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
