import { PipeTransform, Type } from '@angular/core';
import { NGX_PIPE_REGISTRY } from './pipe-registry.token';

export function provideNgxTable(pipes: { [name: string]: Type<PipeTransform> }) {
  return { provide: NGX_PIPE_REGISTRY, useValue: pipes };
}
