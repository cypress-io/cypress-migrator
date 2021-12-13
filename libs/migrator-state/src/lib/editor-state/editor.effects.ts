import { Injectable } from '@angular/core'
import cypressCodemods from '@cypress-dx/codemods'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { exhaustMap, map } from 'rxjs/operators'
import { migrate, migrateResult } from './editor.actions'

@Injectable()
export class EditorEffects {
  constructor(private readonly actions$: Actions) {}

  migrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrate),
      map((action) => action.input),
      exhaustMap((input) => of(cypressCodemods({ input })).pipe(map((result) => migrateResult({ result })))),
    ),
  )
}
