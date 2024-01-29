import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'break'
})
export class BreakPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
