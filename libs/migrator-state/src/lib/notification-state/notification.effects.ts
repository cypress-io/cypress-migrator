import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { delay, map } from 'rxjs'
import {
  addMigrationRequestSuccessOn,
  addMigrationrequestSuccesssOff,
  turnOffNotification,
  turnOnCopiedNotification,
} from './notification.actions'
import { addMigrationSuccess, copyMigration } from '../editor-state'

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

  turnOnAddMigrationRequestSuceessNotifcation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMigrationSuccess),
      map(() => addMigrationRequestSuccessOn()),
    ),
  )

  turnOffAddMigrationRequestSuceessNotifcation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMigrationRequestSuccessOn),
      delay(5000),
      map(() => addMigrationrequestSuccesssOff()),
    ),
  )
}
