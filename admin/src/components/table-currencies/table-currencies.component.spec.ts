import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCurrenciesComponent } from './table-currencies.component';

describe('TableCurrenciesComponent', () => {
  let component: TableCurrenciesComponent;
  let fixture: ComponentFixture<TableCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCurrenciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
