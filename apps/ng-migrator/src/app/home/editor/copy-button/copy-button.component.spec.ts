import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { CopyButtonComponent } from './copy-button.component'

describe('CopyButtonComponent', () => {
  let component: CopyButtonComponent
  let fixture: ComponentFixture<CopyButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyButtonComponent],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
