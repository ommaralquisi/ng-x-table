import {Injector, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'getPipe'
})
export class GetPipe implements PipeTransform {

  constructor(private injector: Injector) {
  }

  transform(value: any, pipeName: string): any {
    if (!pipeName) {
      return value;
    }
    const pipe = this.injector.get<PipeTransform>(<any>pipeName, <any>{});
    if (pipe.transform && typeof  pipe.transform === 'function') {
      return (pipe.transform(value));
    } else {
      return value;
    }
  }

}

