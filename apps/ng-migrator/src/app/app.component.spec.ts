import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing'
import { NavigationComponent } from './navigation/navigation.component'
import { NotificationComponent } from './notification/notification.component'
import { FooterComponent } from './footer/footer.component'
import { provideMockStore } from '@ngrx/store/testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, NavigationComponent, NotificationComponent, FooterComponent],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
