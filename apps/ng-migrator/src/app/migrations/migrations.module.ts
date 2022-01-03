import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'
import { MigrationsComponent } from './migrations.component'
import { MigrationTableComponent } from './migration-table/migration-table.component'
import { markdownOptionsFactory } from './markdown-options-factory'
import { HttpClient } from '@angular/common/http'

const routes: Routes = [
  {
    path: '',
    component: MigrationsComponent,
  },
]

@NgModule({
  declarations: [MigrationsComponent, MigrationTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markdownOptionsFactory,
      },
    }),
  ],
  exports: [RouterModule],
})
export class MigrationsModule {}
