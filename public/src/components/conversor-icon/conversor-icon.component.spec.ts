import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversorIconComponent } from './conversor-icon.component';

describe('ConversorIconComponent', () => {
  let component: ConversorIconComponent;
  let fixture: ComponentFixture<ConversorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversorIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
