import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigratorEditorComponent } from './migrator-editor.component';

describe('MigratorEditorComponent', () => {
  let component: MigratorEditorComponent;
  let fixture: ComponentFixture<MigratorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigratorEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigratorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
