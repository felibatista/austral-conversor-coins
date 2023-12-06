import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConversionsComponent } from './table-conversions.component';

describe('TableConversionsComponent', () => {
  let component: TableConversionsComponent;
  let fixture: ComponentFixture<TableConversionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableConversionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableConversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
