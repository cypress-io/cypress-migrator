import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationEditorComponent } from './migration-editor.component';

describe('MigrationEditorComponent', () => {
  let component: MigrationEditorComponent;
  let fixture: ComponentFixture<MigrationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
