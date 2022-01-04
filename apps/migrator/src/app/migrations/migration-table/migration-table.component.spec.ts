import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'
import { markdownOptionsFactory } from '../markdown-options-factory'

import { MigrationTableComponent } from './migration-table.component'

describe('MigrationTableComponent', () => {
  let component: MigrationTableComponent
  let fixture: ComponentFixture<MigrationTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MigrationTableComponent],
      imports: [
        HttpClientModule,
        MarkdownModule.forRoot({
          loader: HttpClient,
          markedOptions: {
            provide: MarkedOptions,
            useFactory: markdownOptionsFactory,
          },
        }),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
