import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConversionsComponent } from './dashboard-conversions.component';

describe('DashboardConversionsComponent', () => {
  let component: DashboardConversionsComponent;
  let fixture: ComponentFixture<DashboardConversionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardConversionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardConversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
