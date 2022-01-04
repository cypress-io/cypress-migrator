import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BrowserWaitComponent } from './browser-wait.component'

describe('BrowserWaitComponent', () => {
  let component: BrowserWaitComponent
  let fixture: ComponentFixture<BrowserWaitComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowserWaitComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserWaitComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
