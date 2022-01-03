import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { applyTransforms, MigrateResult } from '@cypress-dx/codemods'
import { BehaviorSubject, Observable } from 'rxjs'
@Injectable()
export class MigratorService {
  private results$ = new BehaviorSubject<MigrateResult>({} as MigrateResult)

  constructor(private readonly http: HttpClient) {}

  migrate(input: string): Observable<MigrateResult> {
    const result = applyTransforms({ input })
    this.results$.next(result)
    return this.results$
  }

  addMigration(protractor: string, cypress: string): Observable<{ protractor: string; cypress: string }> {
    return this.http.post<{ protractor: string; cypress: string }>(
      '/api/migrations',
      JSON.stringify({ protractor, cypress }),
    )
  }
}
