import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../components/two-sided-multi-select/two-sided-multi-select.component';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {

  transform(values: Item[], searctKey: string): unknown {
    var filtered = (values||[]).filter((value)=>{
      return value.id.toLocaleLowerCase().indexOf((searctKey||"").toLocaleLowerCase()) > -1||
      value.name.toLocaleLowerCase().indexOf((searctKey||"").toLocaleLowerCase()) > -1||
      value.value.toLocaleLowerCase().indexOf((searctKey||"").toLocaleLowerCase()) > -1 
    });
    return searctKey == null?values:filtered;
  }

}
