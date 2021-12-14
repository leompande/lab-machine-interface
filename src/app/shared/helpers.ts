import * as _ from 'lodash';
import { Result } from '../store/results/reducers/result';
export function makeId(): string {
  let text = '';
  const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 11; i++) {
    text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
  }
  return text;
}



export function getVisualizationCategories(categoryType: string, metaData: any) {
  if (categoryType === 'pe') {
    const items = metaData.items;
    const dimensions = metaData.dimensions;
    return dimensions.pe.map(peItem => {
      return items[peItem].name;
    });
  }
}

export function getVisualizationSeries(seriesType: string, filterType: string, metaData: any, rows: any[], headers: any[]) {
  const dimensions = metaData.dimensions;
  const items = metaData.items;
  const indexOfPe = _.findIndex(headers, (item) => item.name == 'pe');
  const indexOfOu = _.findIndex(headers, (item) => item.name == 'ou');
  const indexOfDx = _.findIndex(headers, (item) => item.name == 'dx');
  const indexOfValue = _.findIndex(headers, (item) => item.name == 'value');
  return dimensions.dx.map((dxItem: string) => {
    return {
      name: items[dxItem].name,
      data: dimensions.pe.map((peItem: string) => {
        const row = rows.find((row: any[]) => {
          return row[indexOfPe] == peItem && row[indexOfDx] == dxItem;
        });
        return +row[indexOfValue];
      })
    }
  });
}

export function getSum(series, name) {
  return series.find(serie => serie.name == name).data.reduce((a, b) => a + b, 0)
}

export function combineChartVisualizationObject(categories, series) {
  return {

    title: {
      text: ''
    },

    subtitle: {
      text: ''
    },

    yAxis: {
      title: {
        text: 'Number of Sign Boards'
      }
    },

    xAxis: {
      categories
    },
    series,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        }
      }]
    }

  };
}

export function get5Years(sign?: string, lastItem?: { id: string, value: number, name: string }, firstItem?: { id: string, value: number, name: string }) {
  let currentYear = new Date().getFullYear();
  let years: { id: string, value: number, name: string }[] = [];
  if (sign == "-") {
    let dropCount = 0;
    while (dropCount < 5) {
      if ((currentYear - dropCount) >= 1970) {
        years = [...years, {
          id: (lastItem.value - dropCount) + "",
          value: (lastItem.value - dropCount),
          name: (lastItem.value - dropCount) + ""
        }];
      }
      dropCount++;

    }

  }

  if (sign == "+") {
    let upCount = 0;
    while (upCount < 5) {
      if ((firstItem.value + upCount) <= currentYear) {
        years = [...years, {
          id: (firstItem.value + upCount) + "",
          value: (firstItem.value + upCount),
          name: (firstItem.value + upCount) + ""
        }];
      }
      upCount++;
    }
  }

  if (sign == null && lastItem == null && firstItem == null) {
    const currentYear = new Date().getFullYear();
    let count = 0;
    while (count < 5) {
      if ((currentYear - count) >= 1970 && (currentYear - count) <= currentYear) {
        years = [...years, {
          id: (currentYear - count) + "",
          value: (currentYear - count),
          name: (currentYear - count) + ""
        }];
      }
      count++;

    }
  }

  return years.sort((a, b) => b.value - a.value);;
}


export function getMonths() {
  return [
    {
      id: "January",
      value: "01",
      name: "January"
    },
    {
      id: "February",
      value: "02",
      name: "February"
    },
    {
      id: "March",
      value: "03",
      name: "March"
    },
    {
      id: "April",
      value: "04",
      name: "April"
    },
    {
      id: "May",
      value: "05",
      name: "May"
    },
    {
      id: "June",
      value: "06",
      name: "June"
    },
    {
      id: "July",
      value: "07",
      name: "July"
    },
    {
      id: "August",
      value: "08",
      name: "August"
    },
    {
      id: "September",
      value: "09",
      name: "September"
    }, {
      id: "October",
      value: "10",
      name: "October"
    },
    {
      id: "November",
      value: "11",
      name: "November"
    },
    {
      id: "December",
      value: "12",
      name: "December"
    }
  ]
}


export function getTableHeaders(result: Result) {
  let headers = [];
  Object.keys(result).forEach(resultItem=>{
    headers.push({name:resultItem,label:resultItem.toLocaleUpperCase(),type:"string"});
  });


return headers;
}

export function getMachines(groupResults:any[]){
  let headers = [];
  groupResults.forEach((result)=>{
    headers.push(Object.keys(result)[0]);
  });

  return headers;
}

export function groupData(results: Result[]) {
  let groupResults = [];

  results.forEach(result => {
    var group = groupResults.find(groupItem => groupItem[result.machineName] != null);
    if (group != null) {
      group[result.machineName].push(result);
    } else {
      var sample = {};
      sample[result.machineName] = [result];
      groupResults.push(sample);
    }

  });
  return groupResults;
}
