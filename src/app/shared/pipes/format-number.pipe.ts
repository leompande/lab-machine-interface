import { Pipe, PipeTransform, Injectable } from '@angular/core';
import * as Moment from 'moment';
import { DatePipe } from '@angular/common';

@Injectable()
@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  transform(value, label: string = '') {
   if (value && !checkForNonNumbers(label)) {
      if (isNaN(value)) {
        if (isDate(value)) {
          return new DatePipe('en-US').transform(value, 'dd/MM/yyyy');
        }
      } else {
        return numberWithCommas(value);
      }
    }
    return value;
  }
}

const checkForNonNumbers = (label: string): boolean => {

  return (
    label.indexOf('GTIN') !== -1 ||
    label.indexOf('Batch') !== -1 ||
    label.indexOf('Transaction') !== -1 ||
    label.indexOf('Period') !== -1 ||
    label.indexOf('Packaging') !== -1 ||
    label.indexOf('Package Number') !== -1 ||
    label.indexOf('Reference') !== -1 ||
    label.indexOf('Store') !== -1 ||
    label.indexOf('VVM Stage') !== -1 ||
    label.indexOf('Name') !== -1 ||
    label.indexOf('Year') !== -1 ||
    label.indexOf('Location') !== -1
  );
};

const numberWithCommas = x => {
  const twoDecimals = Math.round(x * 100) / 100;
  const parts = twoDecimals.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const isStringAValidDate = date => {
  // const formats = [Moment.ISO_8601, 'MM/DD/YYYY  :)  HH*mm*ss'];
  // return Moment(date, formats).isValid() && new Date(date) instanceof Date;
  const dateWrapper = new Date(date);
  if (/^[a-z]/i.test(date)) {
    return false;
  }
  return !isNaN(dateWrapper.getDate());
};

function isDate(sDate) {
  if (sDate.toString() === parseInt(sDate, 10).toString()) {
    return false;
  }
  const tryDate = new Date(sDate);
  return (tryDate && tryDate.toString() !== 'NaN' && tryDate.toString() !== 'Invalid Date');
}
