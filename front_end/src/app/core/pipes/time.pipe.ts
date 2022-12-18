import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

    transform(value: any) {
        const [ hour, minute ] = value.split(':');
        return `${hour}:${minute}`;
    }
}