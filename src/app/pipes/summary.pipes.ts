import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'summery'
})

export class SummaryPipe implements PipeTransform {
    transform(value: string, length?: number) {
        if (length) {
            return value.substr(0, length) + "....";
        }
        else {
            return value.substr(0, 50);
        }
    }

}