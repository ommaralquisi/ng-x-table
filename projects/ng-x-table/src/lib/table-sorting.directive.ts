import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[ngxTableSortingDirective]'
})
export class TableSortingDirective {
  @Input() public column: any;
  @Input() public columns: any;
  @Output() public sortChanged: EventEmitter<any> = new EventEmitter();

  @HostListener('click', ['$event'])
  public onToggleSort(event: any): void {
    if (event) {
      event.preventDefault();
    }

    if (this.column && this.column.sort !== false) {
      switch (this.column.sort) {
        case 'asc':
          this.column.sort = 'desc';
          break;
        case 'desc':
          this.column.sort = 'asc';
          break;
        default:
          this.columns.forEach(col => {
            if (col.sort) {
              col.sort = '';
            }
          });
          this.column.sort = 'asc';
          break;
      }
      this.sortChanged.emit(this.column);
    }
  }
}
