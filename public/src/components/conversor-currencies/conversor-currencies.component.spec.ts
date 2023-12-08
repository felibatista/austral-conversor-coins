import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversorCurrenciesComponent } from './conversor-currencies.component';

describe('ConversorCurrenciesComponent', () => {
  let component: ConversorCurrenciesComponent;
  let fixture: ComponentFixture<ConversorCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversorCurrenciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversorCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
