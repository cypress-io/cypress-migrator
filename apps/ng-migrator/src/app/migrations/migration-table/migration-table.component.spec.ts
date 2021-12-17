import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationTableComponent } from './migration-table.component';

describe('MigrationTableComponent', () => {
  let component: MigrationTableComponent;
  let fixture: ComponentFixture<MigrationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
