import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export enum Query {
  Pick = 'pick',
  Pluck = 'pluck',
  Index = 'index',
  Has = 'has',
  Omit = 'omit',
  Begins = 'begins',
  Ends = 'ends',
}

export enum ComparisonOperand {
  EQ = '=',
  LT = '<',
  GT = '>',
  NE = '!=',
  LTE = '<=',
  GTE = '>=',
}

class Comparison {

  constructor(public operand: ComparisonOperand, public value: string | number | boolean) {

  }
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() selector: string;

  @Output() selectorChange = new EventEmitter<string>();

  @Input() object: any;

  comparison = new Comparison(null, null);

  types: string[] = Object.keys(Query).map(key => Query[key]);

  operands: string[] = Object.keys(ComparisonOperand).map(key => ComparisonOperand[key]);

  queryType: string;

  properties: string;

  value: string | number;

  constructor() { }

  ngOnInit(): void {
    console.debug(`<app-select> object=${JSON.stringify(this.object)} selector=${this.selector}`);

    if (this.selector) {
      const start = this.selector.substring(0, 3);

      if (start.charAt(1) === '[') {
        const params = this.selector.substring(this.selector.indexOf('(') + 1, this.selector.indexOf(')'));

        switch (start) {
          case '$[(':
            this.queryType = Query.Pick;
            this.properties = params;
            break;
          case '$[!':
            this.queryType = Query.Omit;
            this.properties = params;
            break;
          case '$[?':
            this.queryType = Query.Has;

            // if there is only one property it is assigned here
            this.properties = params;

            // if a comparison is used need to split (e.g. loginStatus=Logged-in)
            for (let i = 0; i < this.operands.length; i++) {
              if (params.indexOf(this.operands[i]) > -1) {
                const comparison = params.split(this.operands[i]);
                this.properties = comparison[0];
                // @ts-ignore
                this.comparison = new Comparison(this.operands[i], comparison[1]);
                break;
              }
            }
            break;
          case '$[^':
            this.queryType = Query.Begins;
            this.value = params;
            break;
          case '$[$':
            this.queryType = Query.Ends;
            this.value = params;
            break;
          default:
            this.queryType = Query.Index;
            this.value = parseInt(params);
        }
      }

      if (start.charAt(1) === '.') {
        this.queryType = Query.Pluck;
        this.value = this.selector;
      }
    }

    console.debug(`<app-select> queryType=${this.queryType} properties=${this.properties} value=${this.value} comparison=${JSON.stringify(this.comparison)}`);
  }

  updateQuery(query: Query) {
    this.properties = '';
    this.value = '';
    this.queryType = query;
  }

  selectionChange(properties: string) {
    switch (this.queryType) {
      case Query.Pick:
        this.selectorChange.emit(`$[(${properties})]`);
        break;
      case Query.Has:
        this.properties = properties;
        this.selectorChange.emit(`$[?(${properties})]`);
        break;
      case Query.Omit:
        this.selectorChange.emit(`$[!(${properties})]`);
        break;
    }
  }

  emitSelector() {
    switch (this.queryType) {
      case Query.Pluck:
        this.selectorChange.emit(this.value as string);
        break;
      case Query.Pick:
        this.selectorChange.emit(`$[(${this.properties})]`);
        break;
      case Query.Omit:
        this.selectorChange.emit(`$[!(${this.properties})]`);
        break;
      case Query.Index:
        this.selectorChange.emit(`$[${this.value}]`);
        break;
      case Query.Has:
        // TODO (van) the syntax supports multiple property<operand>values but the UI does not show this
        const [property] = this.properties.split(',');
        this.selectorChange.emit(`$[?(${property}${this.comparison.operand}${this.comparison.value})]`);
        break;
      case Query.Begins:
        this.selectorChange.emit(`$[^(${this.value})]`);
        break;
      case Query.Ends:
        this.selectorChange.emit(`$[$(${this.value})]`);
        break;
    }
  }

  escape(operand: ComparisonOperand): string {
    switch (operand) {
      case ComparisonOperand.LT:
        return '&lt;';
      case ComparisonOperand.GT:
        return '&gt;';
      case ComparisonOperand.LTE:
        return '&lt;=';
      case ComparisonOperand.GTE:
        return '&lt;=';
      default:
        return operand;
    }
  }

  isValid(type: Query) {
    switch (type) {
      case Query.Pick:
        return !Array.isArray(this.object);
      case Query.Pluck:
        return !Array.isArray(this.object);
      case Query.Index:
        return Array.isArray(this.object);
      case Query.Has:
        return !Array.isArray(this.object);
      case Query.Omit:
        return !Array.isArray(this.object);
      case Query.Begins:
        return !Array.isArray(this.object);
      case Query.Ends:
        return !Array.isArray(this.object);
      default:
        return true;
    }
  }
}
