import { Injectable } from '@angular/core';
import { DataLayerRule, DataLayerConfig, DataLayerObserver, LogEvent, LogAppender, OperatorOptions, DataLayerTarget } from '@fullstory/data-layer-observer';
import { Subject } from 'rxjs';
import { DataLayerService } from './datalayer.service';

class ComposerAppender implements LogAppender {

  constructor(private subject: Subject<LogEvent>) {

  }

  log(event: LogEvent): void {
    this.subject.next(event);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ObserverService {

  log$ = new Subject<LogEvent>();

  output$ = new Subject<any[]>();

  registered$ = new Subject<DataLayerRule>();

  config: DataLayerConfig = {
    appender: new ComposerAppender(this.log$),
    // beforeDestination: { name: 'suffix' },
    // @ts-ignore
    previewDestination: (...data: any[]) => {
      this.output$.next(data);
    },
    previewMode: false,
    readOnLoad: true,
    rules: [],
    validateRules: true
  };

  private observer: DataLayerObserver;

  constructor() {
    this.observer = new DataLayerObserver(this.config);
  }

  test(target: DataLayerTarget, options: OperatorOptions[], cb: (data: any) => void, debug?: boolean) {
    const handler = this.observer.registerTarget(target, options, cb, true, false, debug);
    this.observer.removeHandler(handler);
  }

  registerRule(rule: DataLayerRule) {
    const count = this.observer.handlers.length;
    this.observer.registerRule(rule);

    if (this.observer.handlers.length > count) {
      this.registered$.next(rule);
    }
  }

  fireEvents() {
    this.observer.handlers.forEach(handler => {
      handler.fireEvent('');
    });
  }
}
