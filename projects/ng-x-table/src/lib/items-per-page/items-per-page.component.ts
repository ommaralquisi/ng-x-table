import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-items-per-page',
  template: `
    <div class="btn-group">
      <label style="border: 1px solid #dee2e6;" class="btn" [ngClass]="{ 'btn-primary': item.active}"
             *ngFor="let item of list; let i = index "
             (click)="onChangeItem(item.number, i)">{{item.number}}</label>
    </div>
  `
})
export class ItemsPerPageComponent {
  list = [
    { number: 10, active: true },
    { number: 25, active: false },
    { number: 50, active: false },
    { number: 100, active: false }
  ];

  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();

  onChangeItem(item, index) {
    this.list.forEach(i => {
      i.active = false;
    });
    this.list[index].active = true;
    this.itemChange.emit(item);
  }
}
