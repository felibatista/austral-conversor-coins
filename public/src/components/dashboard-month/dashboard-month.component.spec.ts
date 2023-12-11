import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMonthComponent } from './dashboard-month.component';

describe('DashboardMonthComponent', () => {
  let component: DashboardMonthComponent;
  let fixture: ComponentFixture<DashboardMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
