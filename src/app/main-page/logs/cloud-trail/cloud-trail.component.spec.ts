import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudTrailComponent } from './cloud-trail.component';

describe('CloudTrailComponent', () => {
  let component: CloudTrailComponent;
  let fixture: ComponentFixture<CloudTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
