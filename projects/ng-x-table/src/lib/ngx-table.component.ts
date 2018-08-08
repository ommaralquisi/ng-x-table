import { Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ITableConfig, IColumns } from './interfaces';

@Component({
  selector: 'ngx-table',
  template: `
  <table class="table table-striped table-bordered" [ngClass]="{'loader': loading}">
  <thead>
  <tr role="row">
    <th *ngFor="let column of columns" ngxTableSortingDirective [column]="column" [columns]="columns"
        (sortChanged)="onTableSortingChange($event)" [ngClass]="{'sortable':(column.sort || column.sort === '')}">
      {{column.title}}
      <i *ngIf="column.sorting && column.sort" class="pull-right chevron"
         [ngClass]="{'desc': column.sort === 'desc', 'asc': column.sort === 'asc'}"></i>
    </th>
  </tr>
  </thead>
  <tbody>
  <tr *ngIf="displayFilterRow">
    <td *ngFor="let column of columns">
      <input *ngIf="column.filter" (input)="columnFilter(column, $event.target.value)" class="form-control"/>
    </td>
  </tr>
  <tr *ngFor="let dataRow of tableData; let i = index">
    <ng-container *ngIf="rows; else alternateRows">
      <ng-container *ngTemplateOutlet="rows; context:{dataRow: dataRow, index: i, component: component}"></ng-container>
    </ng-container>

    <ng-template #alternateRows>
      <td *ngFor="let column of columns"
          [innerHtml]="sanitize(getPropertyData(dataRow, column.name) | getPipe: column.pipe)"></td>
    </ng-template>
  </tr>
  </tbody>
</table>
<pagination class="float-left" [totalItems]="config.total" [itemsPerPage]="config.itemPerPage"
            [(ngModel)]="currentPage" [boundaryLinks]="true" [rotate]="false"
            [itemsPerPage]="config.itemPerPage"
            (pageChanged)="pageChanged($event)" [maxSize]="5">
</pagination>
<ngx-items-per-page class="float-right" (itemChange)="itemChange($event)"></ngx-items-per-page>
  `,
  styles: [`
  .sortable {
    cursor: pointer;
  }

  /*by default this chevron.asc*/
  .chevron::before {
    border-style: solid;
    border-width: 0.15em 0.15em 0 0;
    content: '';
    display: inline-block;
    height: 0.45em;
    left: 0.15em;
    position: relative;
    top: 0.15em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 0.45em;
    top: 10px;
  }

  .loader {
    height: 4px;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .loader:before {
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 200px;
    height: 4px;
    /*top: 47px;*/
    background-color: #2980b9;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    from {
      left: -200px;
      width: 30%;
    }
    50% {
      width: 30%;
    }
    70% {
      width: 70%;
    }
    80% {
      left: 50%;
    }
    95% {
      left: 120%;
    }
    to {
      left: 100%;
    }
  }

  .chevron.desc:before {
    top: 6px;
    transform: rotate(135deg);
  }
`],
})
export class NgxTableComponent implements OnInit {
  @ContentChild('rows') rows: any;
  @Input() config: ITableConfig;
  @Input() tableData;
  @Input() columns;
  @Input() loading: boolean;
  @Input() component;
  @Output() tableChange: EventEmitter<any> = new EventEmitter<any>();
  currentPage: number;
  displayFilterRow: boolean;

  public constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.currentPage = this.config.currentPage;
    const filterColumns = this.columns.filter(column => column.filter);
    this.displayFilterRow = filterColumns.length > 0;
  }

  setPage(pageNo: number): void {
    setTimeout(() => {
      this.currentPage = pageNo;
    });
  }

  public getPropertyData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }

  public sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  columnFilter(column: IColumns, input: string) {
    setTimeout(() => {
      this.config.filtering = this.config.filtering || { column: '', filteringString: '' };
      Object.assign(this.config.filtering, { column: column.name, filteringString: input });
      this.tableChange.emit(this.config);
    }, 500);
  }

  public onTableSortingChange(column: any): void {
    if (!column.sorting) {
      return;
    }
    this.config.sorting = this.config.sorting || { column: '', direction: '' };
    Object.assign(this.config.sorting, { column: column.name, direction: column.sort });
    this.tableChange.emit(this.config);
  }

  /**
   * this called when the item per page changed
   */
  public itemChange(event) {
    this.config.itemPerPage = event;
    if (this.currentPage === 1) {
      this.pageChanged({ page: 1 });
    } else {
      this.setPage(1);
    }
  }

  /**
   * this called when the pagination changes
   * @param event
   */
  public pageChanged(event: any): void {
    const config = Object.assign({}, this.config);
    config.currentPage = event.page;
    Object.assign(this.config, config);
    setTimeout(() => {
      this.tableChange.emit(this.config);
    });
  }
}
