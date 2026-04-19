import { Component, OnInit } from '@angular/core';
import { IColumns, ITableConfig } from '@ommaralquisi/ng-x-table';
import { GetNamesService } from '../get-names.service';

@Component({
  selector: 'app-dynamic-data-demo',
  standalone: false,
  templateUrl: './dynamic-data-demo.component.html',
  styleUrls: ['./dynamic-data-demo.component.css']
})
export class DynamicDataDemoComponent implements OnInit {
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
  [tableData]="names"
  [columns]="columns"
  [config]="config"
  [loading]="loading"
  (tableChange)="tableChange($event)">
</ngx-table>`;

  componentCode = `import { IColumns, ITableConfig } from '@ommaralquisi/ng-x-table';

@Component({ selector: 'app-root', standalone: false, templateUrl: './app.component.html' })
export class AppComponent implements OnInit {
  names: any[];
  loading: boolean;
  columns: IColumns[] = [
    { title: 'ID',       name: 'id',       sorting: true, sort: '', filter: true },
    { title: 'Name',     name: 'name',     sorting: true, sort: '', filter: true },
    { title: 'Donation', name: 'donation', sorting: true, sort: '', pipe: 'currency' },
  ];
  config: ITableConfig = { total: 0, itemPerPage: 10, currentPage: 1 };

  constructor(private service: YourDataService) {}

  ngOnInit() {
    this.loading = true;
    this.service.getNames(this.config.itemPerPage, 0).subscribe(data => {
      this.config.total = data['count'];
      this.names = data['names'];
      this.loading = false;
    });
  }

  tableChange(config: ITableConfig) {
    this.loading = true;
    const offset = (config.currentPage - 1) * config.itemPerPage;
    this.service.getNames(config.itemPerPage, offset).subscribe(data => {
      this.config.total = data['count'];
      this.names = data['names'];
      this.loading = false;
    });
  }
}`;

  names: any[];
  loading: boolean;
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
  constructor(private service: GetNamesService) {}

  ngOnInit() {
    this.loading = true;
    this.service
      .getNames(this.config.itemPerPage, (this.config.currentPage - 1) * this.config.itemPerPage)
      .subscribe(data => {
        this.config.total = data['count'];
        this.names = data['names'];
        this.loading = false;
      });
  }

  tableChange(config: ITableConfig) {
    this.loading = true;
    this.service
      .getNames(config.itemPerPage, (config.currentPage - 1) * config.itemPerPage)
      .subscribe(data => {
        this.config.total = data['count'];
        this.names = data['names'];
        this.loading = false;
      });
  }

}
