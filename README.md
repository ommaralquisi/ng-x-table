# Ngx-TABLE
## Installation 
* `npm install --save ngx-table`
* Import `NgxTableModule` into module
* import import `ITableConfig`, `IColumns`, `ISorting`, `IFiltering` into the component


## Usage 
### Usage  without with template 
```html
<ngx-table	
    [tableData]="data" 
    [columns]="columns"
    [config]="config" 
    (tableChange)="tableChange($event)">
</ngx-table>
```
* `[tableData]` accept an array of data 
* `[columns]` accept an array of `IColumns` JSONs.
* `IColumns` interface has the following property.
	* `title: string`  title of the table column.
	* `name: string` the property name to display.
	* `sorting: boolean` whether the column should be sortable or not.
	* `sort: string` (optional) initial column sorting ‘asc’ or ‘desc’.
	* `filter: boolen` (optional) display filter on top the column.
	* `pipe: string` (optional) accept a pipe to be applied the column data.
* `[config]`  accept a  config JSON Object of type `ITableConfig`
* `ITableConfig` interface had the following propertied 
	*  `total: number` total length of the data.
	* `itemPerPage: number` (10, 25, 50,  or 100) how many item should the table display.
	*  `currentPage: number`  the current page the table displaying.
* `(tableChange)` accept a function with `ITableConfig` parameter. It will fires when the table changes, such changes are: 
	* Column sorting.
	* Column filtering.
	* Page changed.
	* Number of item per page changes.

 
 


### Usage with template
You can pass a template to ngx-table directive which will render the cells of the table  
```html
<ngx-table 
    [tableData]="data" 
    [columns]="columns" 
    [config]="config" 
    (tableChange)="tableChange($event)">
        <ng-template #rows let-item="dataRow" let-i="index">
            <td>{{item.id }}</td>
            <td>{{item.name }}</td>
            <td>{{item.email }}</td>
            <td>{{item.age}}</td>
            <td 
                style='cursor: pointer;' 
                title="open console to see message" 
                (click)="component.logMe(item.phone)">{{item.phone}}
            </td>
            <td>
                <a href="https://en.wikipedia.org/wiki/{{item.city}}">
                    {{item.city}}
                </a>
            </td>
            <td>{{item.rank}}</td>
            <td>{{item.donation | currency}}</td>
        </ng-template>
</ngx-table>
```
