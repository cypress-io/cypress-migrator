import { Injectable } from '@angular/core'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, switchMap, tap } from 'rxjs'
import { selectModified } from './editor.selectors'
import { migrate, migrateResult, copyMigration } from './editor.actions'
import { MigratorService } from './migrator.service'

@Injectable()
export class EditorEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly migratorService: MigratorService,
    private readonly store: Store,
  ) {}

  migrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrate),
      map((action) => action.input),
      switchMap((input) => this.migratorService.migrate(input).pipe(map((result) => migrateResult({ result })))),
    ),
  )

  copy$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(copyMigration),
        concatLatestFrom(() => this.store.select(selectModified)),
        tap(([action, modified]) => navigator.clipboard.writeText(modified)),
      ),
    { dispatch: false },
  )
}
