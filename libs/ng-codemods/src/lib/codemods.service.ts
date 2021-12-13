import { Injectable } from '@angular/core'
import cypressCodemods, { MigrateResult } from '@cypress-dx/codemods'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable()
export class CodemodsService {
  private result$ = new BehaviorSubject<MigrateResult>({} as MigrateResult)

  migrate(input: string): Observable<MigrateResult> {
    const result = cypressCodemods({ input })
    console.log(result)
    this.result$.next(result)
    return this.result$
  }
}
