import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OraganisationProfileComponent } from './oraganisation-profile.component';

describe('OraganisationProfileComponent', () => {
  let component: OraganisationProfileComponent;
  let fixture: ComponentFixture<OraganisationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OraganisationProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OraganisationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
