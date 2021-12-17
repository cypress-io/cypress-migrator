import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SelectLanguageComponent } from './select-language.component'
import { provideMockStore } from '@ngrx/store/testing'

describe('SelectLanguageComponent', () => {
  let component: SelectLanguageComponent
  let fixture: ComponentFixture<SelectLanguageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectLanguageComponent],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLanguageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
