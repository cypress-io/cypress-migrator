import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { ErrorAlertsComponent } from './error-alerts.component'

describe('ErrorAlertsComponent', () => {
  let component: ErrorAlertsComponent
  let fixture: ComponentFixture<ErrorAlertsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorAlertsComponent],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAlertsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
