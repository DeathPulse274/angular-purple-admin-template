import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostInsightsComponent } from './cost-insights.component';

describe('CostInsightsComponent', () => {
  let component: CostInsightsComponent;
  let fixture: ComponentFixture<CostInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
