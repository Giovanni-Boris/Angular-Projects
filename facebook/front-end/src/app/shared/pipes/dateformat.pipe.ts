import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'customDateFormat',
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      const formattedDate = moment(value).fromNow();
      return formattedDate;
    }
    return '';
  }
}
