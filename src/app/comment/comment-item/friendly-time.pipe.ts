import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, parseISO } from 'date-fns';

@Pipe({
  name: 'friendlyTime',
})
export class FriendlyTimePipe implements PipeTransform {

  transform(timeString: string): string {
    const now = new Date();
    const time = parseISO(timeString);
    const minutes = differenceInMinutes(now, time);
    const hours = differenceInHours(now, time);
    const days = differenceInDays(now, time);
    const months = differenceInMonths(now, time);
    if (minutes < 3) {
      return '刚刚';
    } else if (hours < 1) {
      return `${minutes} 分钟前`;
    } else if (days < 1) {
      return `${hours} 小时前`;
    } else if (months < 1) {
      return `${days} 天前`;
    } else {
      return time.toDateString();
    }
  }

}
