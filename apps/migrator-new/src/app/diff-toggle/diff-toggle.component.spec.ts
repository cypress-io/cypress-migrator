import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffToggleComponent } from './diff-toggle.component';

describe('DiffToggleComponent', () => {
  let component: DiffToggleComponent;
  let fixture: ComponentFixture<DiffToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiffToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
