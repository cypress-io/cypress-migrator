import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { delay, map } from 'rxjs'
import { turnOffNotification, turnOnCopiedNotification } from '.'
import { copyMigration } from '../editor-state'

@Injectable()
export class NotificationEffects {
  constructor(private readonly actions$: Actions) {}

  copyNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(copyMigration),
      map(() => turnOnCopiedNotification()),
    ),
  )

  turnOffNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(turnOnCopiedNotification),
      delay(5000),
      map(() => turnOffNotification()),
    ),
  )
}
