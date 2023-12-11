import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCurrenciesComponent } from './dashboard-currencies.component';

describe('DashboardCurrenciesComponent', () => {
  let component: DashboardCurrenciesComponent;
  let fixture: ComponentFixture<DashboardCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCurrenciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
