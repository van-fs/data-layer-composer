import { Injectable } from '@angular/core';
import { DataLayerRule, DataLayerConfig, DataLayerObserver, LogEvent, LogAppender } from '@fullstory/data-layer-observer';
import { Subject } from 'rxjs';
import { ComposerRule } from '../models/composer-rule';

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

  test(rule: ComposerRule, debug?: boolean) {
    // TODO (van) fix this hack
    if (rule.handler) {
      rule.handler.stop();
    }

    // NOTE the composer doesn't monitor or read on load - it just reads when you click the test button
    const handler = this.observer.registerTarget(rule.target, rule.operators, rule.destination, false, false, debug);
    rule.handler = handler;
    rule.handler.fireEvent(rule.target.query());
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
