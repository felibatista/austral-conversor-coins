import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoadingComponent } from './edit-loading.component';

describe('EditLoadingComponent', () => {
  let component: EditLoadingComponent;
  let fixture: ComponentFixture<EditLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
