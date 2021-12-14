import { Injectable } from '@angular/core'
// import cypressCodemods, { MigrateResult } from '@cypress-dx/codemods'
import { BehaviorSubject, Observable } from 'rxjs'

interface APIItem {
  command: string
  url: string
}
interface DiffArrayItem {
  original: string
  modified: string
  api?: APIItem[]
}

interface MigrateResult {
  output: string | undefined
  diff: DiffArrayItem[]
  error?: {
    message: string
    level: 'warning' | 'error' | 'info'
  }
}

@Injectable()
export class CodemodsService {
  private result$ = new BehaviorSubject<MigrateResult>({} as MigrateResult)

  migrate(input: string): Observable<MigrateResult> {
    // const result = cypressCodemods({ input })
    const result: MigrateResult = { diff: [], output: input, error: { message: 'Manual Error', level: 'error' } }
    this.result$.next(result)
    return this.result$
  }
}
