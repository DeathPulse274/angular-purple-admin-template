import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbComponent } from './alb.component';

describe('AlbComponent', () => {
  let component: AlbComponent;
  let fixture: ComponentFixture<AlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
