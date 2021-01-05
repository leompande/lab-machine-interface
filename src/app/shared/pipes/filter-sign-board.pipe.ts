import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSignBoard'
})
export class FilterSignBoardPipe implements PipeTransform {

  transform(values: any[], fieldName: string, fieldValue: string): unknown {
    var newListItems = [];
    if (fieldValue && fieldValue != undefined ){
      newListItems = values.filter(value => {
        return value[fieldName] != undefined && (value[fieldName].toLowerCase() == (fieldValue).toLowerCase());
      });

    return newListItems;
    } else{
      return [];
    }
  }

}
