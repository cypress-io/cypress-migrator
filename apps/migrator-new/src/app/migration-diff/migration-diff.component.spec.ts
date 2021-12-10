import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationDiffComponent } from './migration-diff.component';

describe('MigrationDiffComponent', () => {
  let component: MigrationDiffComponent;
  let fixture: ComponentFixture<MigrationDiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationDiffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
