import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MigrationErrorsComponent } from './migration-errors.component'

describe('MigrationErrorsComponent', () => {
  let component: MigrationErrorsComponent
  let fixture: ComponentFixture<MigrationErrorsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MigrationErrorsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationErrorsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
