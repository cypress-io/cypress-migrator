import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { migrate, migrateResult } from './editor.actions'
import { MigratorService } from './migrator.service'

@Injectable()
export class EditorEffects {
  constructor(private readonly actions$: Actions, private readonly migratorService: MigratorService) {}

  migrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrate),
      map((action) => action.input),
      switchMap((input) => this.migratorService.migrate(input).pipe(map((result) => migrateResult({ result })))),
    ),
  )
}
