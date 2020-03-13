import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudFrontComponent } from './cloud-front.component';

describe('CloudFrontComponent', () => {
  let component: CloudFrontComponent;
  let fixture: ComponentFixture<CloudFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
