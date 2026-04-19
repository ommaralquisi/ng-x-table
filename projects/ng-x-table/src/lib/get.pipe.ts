import { Injector, Pipe, PipeTransform, Type } from '@angular/core';
import { NGX_PIPE_REGISTRY } from './pipe-registry.token';

@Pipe({
  name: 'getPipe'
})
export class GetPipe implements PipeTransform {

  constructor(private injector: Injector) {}

  transform(value: any, pipeName: string): any {
    if (!pipeName) {
      return value;
    }
    const registry = this.injector.get<{ [name: string]: Type<PipeTransform> } | null>(NGX_PIPE_REGISTRY, null);
    if (!registry || !registry[pipeName]) {
      return value;
    }
    const pipe = this.injector.get<PipeTransform | null>(registry[pipeName], null);
    if (pipe && typeof pipe.transform === 'function') {
      return pipe.transform(value);
    }
    return value;
  }

}

