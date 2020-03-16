import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSavingsComponent } from './cost-savings.component';

describe('CostSavingsComponent', () => {
  let component: CostSavingsComponent;
  let fixture: ComponentFixture<CostSavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostSavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
