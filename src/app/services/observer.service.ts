import { Injectable } from '@angular/core';
import { DataLayerRule, DataLayerConfig, DataLayerObserver, LogEvent, LogAppender } from '@fullstory/data-layer-observer';
import { Subject } from 'rxjs';

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
    beforeDestination: { name: 'suffix' },
    // @ts-ignore
    previewDestination: (...data: any[]) => {
      this.output$.next(data);
    },
    previewMode: true,
    readOnLoad: true,
    rules: [],
    validateRules: true
  };

  private observer: DataLayerObserver;

  constructor() {
    this.observer = new DataLayerObserver(this.config);
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
