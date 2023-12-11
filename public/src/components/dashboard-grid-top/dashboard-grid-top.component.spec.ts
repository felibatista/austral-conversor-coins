import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGridTopComponent } from './dashboard-grid-top.component';

describe('DashboardGridTopComponent', () => {
  let component: DashboardGridTopComponent;
  let fixture: ComponentFixture<DashboardGridTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGridTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardGridTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
