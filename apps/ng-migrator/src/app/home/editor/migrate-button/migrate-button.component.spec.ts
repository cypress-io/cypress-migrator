import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateButtonComponent } from './migrate-button.component';

describe('MigrateButtonComponent', () => {
  let component: MigrateButtonComponent;
  let fixture: ComponentFixture<MigrateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrateButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
