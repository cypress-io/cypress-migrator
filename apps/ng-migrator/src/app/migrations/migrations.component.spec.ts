import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { MigrationsComponent } from './migrations.component'
import { MigrationsModule } from './migrations.module'

describe('MigrationsComponent', () => {
  let component: MigrationsComponent
  let fixture: ComponentFixture<MigrationsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigrationsModule, HttpClientModule, RouterTestingModule],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
