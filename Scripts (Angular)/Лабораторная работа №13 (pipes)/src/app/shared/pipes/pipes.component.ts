import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'MyFilterPipe'
})
export class MyFilterPipe implements PipeTransform {

  transform(months: string[], searchStr: string) {

    if (!isNullOrUndefined(months) && searchStr.trim().length > 0) {
      // let newArr = months.filter(month => month.toLocaleLowerCase() === searchStr.toLocaleLowerCase());
      let newArr = months.filter(month => 
        month.toLocaleLowerCase().indexOf(searchStr.toLocaleLowerCase()) === 0);
      return newArr;
    } else {
      return months;
    }

  }

}

