# @ommaralquisi/ng-x-table

An Angular table library with sorting, filtering, pagination, and pipe support.

[![npm version](https://badge.fury.io/js/%40ommaralquisi%2Fng-x-table.svg)](https://www.npmjs.com/package/@ommaralquisi/ng-x-table)

## Requirements

- Angular 19+
- ngx-bootstrap 19+

## Installation

```bash
npm install @ommaralquisi/ng-x-table ngx-bootstrap
```

## Setup

Import `NgxTableModule` and register any pipes you want applied to table columns using `provideNgxTable()`.

```ts
import { CurrencyPipe } from '@angular/common';
import { NgxTableModule, provideNgxTable } from '@ommaralquisi/ng-x-table';

@NgModule({
  imports: [NgxTableModule],
  providers: [
    CurrencyPipe,
    provideNgxTable({ currency: CurrencyPipe }),
  ]
})
export class AppModule {}
```

## Usage

### Basic table

```html
<ngx-table
  [tableData]="data"
  [columns]="columns"
  [config]="config"
  (tableChange)="tableChange($event)">
</ngx-table>
```

```ts
import { IColumns, ITableConfig, ISorting, IFiltering } from '@ommaralquisi/ng-x-table';

columns: IColumns[] = [
  { title: 'ID',       name: 'id',       sorting: true, sort: '' },
  { title: 'Name',     name: 'name',     sorting: true, sort: '', filter: true },
  { title: 'Donation', name: 'donation', sorting: true, sort: '', pipe: 'currency' },
];

config: ITableConfig = {
  total: 0,
  itemPerPage: 10,
  currentPage: 1,
};

tableChange(config: ITableConfig) {
  // re-fetch or re-slice your data based on config
}
```

### With a custom row template

Pass an `#rows` template to control how each row is rendered.

```html
<ngx-table
  [tableData]="data"
  [columns]="columns"
  [config]="config"
  [component]="this"
  (tableChange)="tableChange($event)">
  <ng-template #rows let-item="dataRow" let-i="index" let-component="component">
    <td>{{ item.id }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.donation | currency }}</td>
    <td (click)="component.doSomething(item)">Action</td>
  </ng-template>
</ngx-table>
```

## API

### `<ngx-table>` inputs

| Input | Type | Description |
|---|---|---|
| `[tableData]` | `any[]` | Array of row data |
| `[columns]` | `IColumns[]` | Column definitions |
| `[config]` | `ITableConfig` | Pagination and state config |
| `[loading]` | `boolean` | Shows a loading indicator |
| `[component]` | `any` | Pass the host component to access its methods inside a row template |

### `<ngx-table>` outputs

| Output | Payload | Description |
|---|---|---|
| `(tableChange)` | `ITableConfig` | Fires on sort, filter, page, or page-size change |

### `IColumns`

| Property | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes | Column header text |
| `name` | `string` | yes | Property path on the data object |
| `sorting` | `boolean` | yes | Enable column sorting |
| `sort` | `string` | no | Initial sort direction: `'asc'`, `'desc'`, or `''` |
| `filter` | `boolean` | no | Show a text filter input for this column |
| `pipe` | `string` | no | Key from the `provideNgxTable()` registry to apply to cell values |

### `ITableConfig`

| Property | Type | Description |
|---|---|---|
| `total` | `number` | Total number of records (for pagination) |
| `itemPerPage` | `number` | Items per page (10, 25, 50, or 100) |
| `currentPage` | `number` | Current page number |
| `sorting` | `ISorting` | Set by the table on sort change |
| `filtering` | `IFiltering` | Set by the table on filter change |

### `provideNgxTable(pipes)`

Registers Angular pipes that can be referenced by name in column definitions.

```ts
provideNgxTable({
  currency: CurrencyPipe,
  date: DatePipe,
  uppercase: UpperCasePipe,
})
```

Then in your column: `{ name: 'amount', pipe: 'currency' }`.

## Publishing to npm (maintainers)

**1. Build the library**
```bash
ng build ng-x-table --configuration production
```

**2. Verify the output**
```bash
cat dist/ngx-table/package.json   # confirm version number
```

**3. Login to npm**
```bash
npm login
```

**4. Publish**
```bash
cd dist/ngx-table
npm publish --access public
```

> `--access public` is required for scoped packages (`@ommaralquisi/...`) to be publicly accessible.

**Bump the version** in `projects/ng-x-table/package.json` before each release.

## Demo

Run the demo app locally:

```bash
ng build ng-x-table        # build the library first
ng serve                   # start the demo at http://localhost:4200
```
