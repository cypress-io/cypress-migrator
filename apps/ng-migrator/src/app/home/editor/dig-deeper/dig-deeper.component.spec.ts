import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { DigDeeperComponent } from './dig-deeper.component'

describe('DigDeeperComponent', () => {
  let component: DigDeeperComponent
  let fixture: ComponentFixture<DigDeeperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigDeeperComponent],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DigDeeperComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
