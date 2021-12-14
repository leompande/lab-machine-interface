import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../components/two-sided-multi-select/two-sided-multi-select.component';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {

  transform(values: Item[], searctKey: string): unknown {
    var filtered = (values || []).filter((value) => {
      return value.id.toLocaleLowerCase().indexOf((searctKey || "").toLocaleLowerCase()) > -1 ||
        value.name.toLocaleLowerCase().indexOf((searctKey || "").toLocaleLowerCase()) > -1 ||
        value.value.toLocaleLowerCase().indexOf((searctKey || "").toLocaleLowerCase()) > -1
    });
    return searctKey == null ? values : filtered;
  }

}

@Pipe({
  name: 'filterResults'
})
export class FilterResultPipe implements PipeTransform {

  transform(values: any[], searctKey: string): unknown {
    var filtered = (values || []).filter((value) => {
      return value.result.toLocaleLowerCase().indexOf((searctKey || "").toLocaleLowerCase()) > -1 ||
        value.reagentLot.toLocaleLowerCase().indexOf((searctKey || "").toLocaleLowerCase()) > -1 ||
        value.reagentSerialNumber.toLocaleLowerCase().indexOf((searctKey || "").toLocaleLowerCase()) > -1 ||
        value.patientId.toLocaleLowerCase().indexOf((searctKey || "").toLocaleLowerCase()) > -1
    });
    return searctKey == null ? values : filtered;
  }

}
