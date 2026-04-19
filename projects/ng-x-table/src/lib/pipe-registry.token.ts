import { InjectionToken, PipeTransform, Type } from '@angular/core';

export const NGX_PIPE_REGISTRY = new InjectionToken<{ [name: string]: Type<PipeTransform> }>('NgxPipeRegistry');
