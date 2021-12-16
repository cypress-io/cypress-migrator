import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { formatedResult, formatInput, migrate, migrateResult } from './editor.actions'
import { FormatService } from './format.service'

@Injectable()
export class FormatEffects {
  constructor(private actions$: Actions, private readonly formatService: FormatService) {}

  formatInput$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrate),
      map((action) => action.input),
      switchMap((value) => this.formatService.formatInput(value).pipe(map((input) => formatInput({ input })))),
    ),
  )

  formatResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrateResult),
      map((action) => (!!action.result.output ? action.result.output : '')),
      switchMap((value) => this.formatService.formatResult(value).pipe(map((result) => formatedResult({ result })))),
    ),
  )
}
