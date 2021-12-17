import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { NoMigrationsComponent } from './no-migrations.component'

describe('NoMigrationsComponent', () => {
  let component: NoMigrationsComponent
  let fixture: ComponentFixture<NoMigrationsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoMigrationsComponent],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMigrationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
