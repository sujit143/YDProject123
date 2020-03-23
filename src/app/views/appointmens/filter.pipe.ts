import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any[]): any {
    console.log(args);
    if (!args) {
      return value;
    }

    var filterData = _.filter(value, (v) => {
        return (v.Location == args || v.Doctor == args);
    });
    return filterData;

  }

}
