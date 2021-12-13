import { Injectable } from '@angular/core'
import { CodemodsService } from '@cypress-dx/ng-codemods'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { exhaustMap, map } from 'rxjs/operators'
import { migrate, migrateResult } from './editor.actions'

@Injectable()
export class EditorEffects {
  constructor(private readonly actions$: Actions, private readonly codemodsService: CodemodsService) {}

  migrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrate),
      map((action) => action.input),
      exhaustMap((input) => this.codemodsService.migrate(input).pipe(map((result) => migrateResult({ result })))),
    ),
  )
}
