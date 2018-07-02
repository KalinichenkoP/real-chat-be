import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Pipe, displaying date in a conventional readable format.
 */
@Pipe({ name: 'prettyDate', pure: false })
export class PrettyDatePipe implements PipeTransform {
    transform (date: string): string {
        return moment(date).format('MMMM Do, YYYY');
    }
}
