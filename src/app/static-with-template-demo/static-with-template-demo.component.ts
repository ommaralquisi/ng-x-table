import { Component } from '@angular/core';
import { ITableConfig, IColumns, ISorting, IFiltering } from '@ommaralquisi/ng-x-table';
import { names } from '../helper/staticNames';

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Component({
  selector: 'app-static-with-template-demo',
  standalone: false,
  templateUrl: './static-with-template-demo.component.html',
  styleUrls: ['./static-with-template-demo.component.css']
})
export class StaticWithTemplateDemoComponent  {
  moduleCode = `import { CurrencyPipe } from '@angular/common';
import { NgxTableModule, provideNgxTable } from '@ommaralquisi/ng-x-table';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxTableModule],
  providers: [
    CurrencyPipe,
    provideNgxTable({ currency: CurrencyPipe }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}`;

  templateCode = `<ngx-table
  [tableData]="data"
  [columns]="columns"
  [config]="config"
  [component]="this"
  (tableChange)="tableChange($event)">
  <ng-template #rows let-item="dataRow" let-i="index" let-component="component">
    <td>{{ item.id }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.donation | currency }}</td>
    <td (click)="component.logMe(item.phone)">{{ item.phone }}</td>
  </ng-template>
</ngx-table>`;

  componentCode = `import { IColumns, ITableConfig } from '@ommaralquisi/ng-x-table';

@Component({ selector: 'app-root', standalone: false, templateUrl: './app.component.html' })
export class AppComponent {
  appComponent = this;
  data: any[];
  columns: IColumns[] = [
    { title: 'Donation', name: 'donation', sorting: true, sort: '' },
  ];
  config: ITableConfig = { total: 0, itemPerPage: 10, currentPage: 1 };

  logMe(phone: string) { console.log(phone); }
  tableChange(config: ITableConfig) { /* re-slice data */ }
}`;
  appComponent;
  data: any;
  columns: IColumns[] = [
    { title: 'ID', name: 'id', sorting: true, sort: '', filter: true },
    { title: 'Name', name: 'name', sorting: true, sort: '', filter: true },
    { title: 'Email', name: 'email', sorting: true, sort: '' },
    { title: 'Age', name: 'age', sorting: true, sort: 'asc' },
    { title: 'Phone', name: 'phone', sorting: true, sort: '' },
    { title: 'City', name: 'city', sorting: true, sort: '' },
    { title: 'Rank', name: 'rank', sorting: true, sort: '' },
    { title: 'Donation', name: 'donation', sorting: true, sort: '' , pipe: 'currency'}
  ];
  config: ITableConfig = {
    total: 0,
    itemPerPage: 10, // how many item should the table display
    currentPage: 1, // the current page the table displaying
  };

  constructor() {
    this.appComponent = this;
    this.config.total = names.length;
    this.data = names.slice(
      (this.config.currentPage - 1) * this.config.itemPerPage,
      this.config.currentPage * this.config.itemPerPage
    );
  }

  tableChange(config: ITableConfig) {
    console.log(config);
    let tempData = names;
    tempData = config.sorting ? this.sorting(config.sorting, tempData) : tempData;
    tempData = config.filtering ? this.filtering(config.filtering, tempData) : tempData;
    this.config.total = tempData.length;
    this.data = tempData.slice((config.currentPage - 1) * config.itemPerPage, config.currentPage * config.itemPerPage);

  }

  sorting(sorting: ISorting, data) {
    const columnName = sorting.column;
    const sortDirection = sorting.direction;
    if (!columnName) {
      return;
    }
    // console.log(columnName, sortDirection);
    data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sortDirection === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      return 0;
    });
    return data;
  }

  filtering(filtering: IFiltering, data) {
    return data.filter(name => {
      const regex = new RegExp(escapeRegExp(filtering.filteringString), 'i');
      return name[filtering.column].toString().match(regex);
    });
  }

  logMe(phone) {
    console.log(phone);
  }
}
