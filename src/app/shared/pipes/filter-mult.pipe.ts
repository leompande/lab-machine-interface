import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMult'
})
export class FilterMultPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
