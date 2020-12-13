import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitToArray'
})
export class SplitToArrayPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.split(",");
  }

}
