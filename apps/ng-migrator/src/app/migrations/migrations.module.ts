import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MigrationsComponent } from './migrations.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: MigrationsComponent,
  },
]

@NgModule({
  declarations: [MigrationsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigrationsModule {}
