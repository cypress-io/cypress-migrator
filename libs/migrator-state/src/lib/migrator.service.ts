import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import cypressCodemods, { MigrateResult } from '@cypress-dx/codemods'

@Injectable()
export class MigratorService {
  private results$ = new BehaviorSubject<MigrateResult>({} as MigrateResult)

  migrate(input: string): Observable<MigrateResult> {
    const result = cypressCodemods({ input })
    this.results$.next(result)
    return this.results$
  }
}
