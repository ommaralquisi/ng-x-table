import { Component, OnInit } from '@angular/core';
import { names } from '../helper/staticNames';
import { IColumns, ITableConfig, ISorting, IFiltering } from '@ommaralquisi/ng-x-table';
import { escapeRegExp } from 'tslint/lib/utils';

@Component({
  selector: 'app-static-data-demo',
  templateUrl: './static-data-demo.component.html',
  styleUrls: ['./static-data-demo.component.css']
})
export class StaticDataDemoComponent {

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
}
