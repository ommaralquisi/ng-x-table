import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, PaginationModule } from 'ngx-bootstrap';
import { ItemsPerPageComponent } from './items-per-page/items-per-page.component';
import { NgxTableComponent } from './ngx-table.component';
import { GetPipe } from './get.pipe';
import { TableSortingDirective } from './table-sorting.directive';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
  ],
  declarations: [NgxTableComponent, TableSortingDirective, ItemsPerPageComponent, GetPipe],
  exports: [NgxTableComponent]
})
export class NgxTableModule { }
