import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { format } from 'prettier'
import * as typescriptParser from 'prettier/parser-typescript'

@Injectable()
export class FormatService {
  private input$ = new BehaviorSubject<string>('')
  private result$ = new BehaviorSubject<string>('')

  formatInput(value: string): Observable<string> {
    const result = this.doFormat(value)
    this.input$.next(result)
    return this.input$
  }

  formatResult(value: string): Observable<string> {
    const result = this.doFormat(value)
    this.result$.next(result)
    return this.result$
  }

  private doFormat(value: string): string {
    return format(value, { semi: false, singleQuote: true, parser: 'typescript', plugins: [typescriptParser] })
  }
}
