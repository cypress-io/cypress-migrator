import { Injectable } from '@angular/core'
import { DiffArrayItem } from '@cypress-dx/migrate-protractor'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map } from 'rxjs'
import {
  turnOffBrowserWaitMigrationFoundAlert,
  turnOffMigrationNotFoundAlert,
  turnOffXPathMigrationFoundAlert,
  turnOnXPathMigrationFoundAlert,
} from '.'
import { migrateResult } from '../editor-state'
import { turnOnBrowserWaitMigrationFoundAlert, turnOnMigrationNotFoundAlert } from './alerts.actions'

@Injectable()
export class AlertsEffects {
  constructor(private readonly actions$: Actions) {}

  setMigrationsNotFoundAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrateResult),
      map((action) => action.result.diff),
      map((diff) =>
        this.checkIfMigrationsHaveNotBeenMade(diff) ? turnOnMigrationNotFoundAlert() : turnOffMigrationNotFoundAlert(),
      ),
    ),
  )

  setBrowserWaitMigrationMadeAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrateResult),
      map((action) => action.result.diff),
      map((diff) =>
        this.checkIfBrowserWaitMigrationMade(diff)
          ? turnOnBrowserWaitMigrationFoundAlert()
          : turnOffBrowserWaitMigrationFoundAlert(),
      ),
    ),
  )

  setXPathMigrationMadeAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(migrateResult),
      map((action) => action.result.diff),
      map((diff) =>
        this.checkIfXPathMigrationMade(diff) ? turnOnXPathMigrationFoundAlert() : turnOffXPathMigrationFoundAlert(),
      ),
    ),
  )

  private checkIfXPathMigrationMade(diffArray: DiffArrayItem[]): boolean {
    return (
      diffArray.filter((diff) => diff.api && diff.api?.filter((api) => api.command === 'xpath')?.length > 0)?.length > 0
    )
  }

  private checkIfBrowserWaitMigrationMade(diffArray: DiffArrayItem[]): boolean {
    return (
      diffArray.filter((diff) => diff.api && diff.api?.filter((api) => api.command === 'wait')?.length > 0)?.length > 0
    )
  }

  private checkIfMigrationsHaveNotBeenMade(diffArray: DiffArrayItem[]): boolean {
    return diffArray.length > 0 && diffArray.every((diff) => diff.original === diff.modified)
  }
}
