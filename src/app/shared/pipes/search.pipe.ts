import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(listItems: any[], searchString: string, listHeaders: any[]): unknown {
    var newListItems = [];
    newListItems = !searchString || searchString == "" ? listItems : listItems.filter(listItem => {
      return listHeaders.findIndex(listHeader => {
        return listItem[listHeader['name']] && (listItem[listHeader['name']].toLowerCase() == (searchString || "").toLowerCase() || listItem[listHeader['name']].toLowerCase().indexOf((searchString || "").toLowerCase())>-1);
      }) > -1
    });

    return newListItems;
  }

}
