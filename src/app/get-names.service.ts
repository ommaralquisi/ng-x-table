import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNamesService {
  constructor(private http: HttpClient) {}

  getNames(limit: number, offset: number) {
    const su = new Subject();
    this.http.get('api/names').subscribe(data => {
        return su.next({names: data['names'].slice(offset, limit + offset), count: data['count']});
    });
    return su;
  }
}
