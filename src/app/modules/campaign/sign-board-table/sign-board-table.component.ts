import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fadeSmooth, fadeIn, ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/animations/router-animation';

@Component({
  selector: 'app-sign-board-table',
  templateUrl: './sign-board-table.component.html',
  styleUrls: ['./sign-board-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSmooth, fadeIn]
})
export class SignBoardTableComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() signBoards;

  /** Table Inputs */
  @Input()
  tableList = [];
  totalAmount!: number;
  @Input()
  tableConfigurations: {
    tableColumns: Array<{ name: string; label: string, type?: string, noSeparator?:boolean, head_align?:boolean }>;
    identifierColumn?: string;
    tableCaption: string;
    printTitle?: string;
    allowPagination: boolean;
    tableNotifications: any;
    actionIcons: any;
    doneLoading: any;
    deleting: any;
    showSearch: boolean;
    showBorder: boolean;
    empty_msg: string;
    hideExport: boolean;
    head_align: any;
    noSeparator: boolean;
  } = {
      tableColumns: [],
      tableCaption: '',
      printTitle: '',
      identifierColumn: null,
      allowPagination: true,
      tableNotifications: null,
      actionIcons: {
        edit: false,
        delete: false,
        more: false,
        print: false,
        cancel: false,
      },
      doneLoading: false,
      deleting: {},
      showSearch: true,
      showBorder: true,
      empty_msg: 'No Data',
      hideExport: false,
      head_align: false,
      noSeparator: false
    };
  @Input()
  loading!: boolean;
  searchFieldControl: FormControl;

  /** Table Events */
  @Output()
  rowUpdate: EventEmitter<any> = new EventEmitter();
  @Output()
  rowDelete: EventEmitter<any> = new EventEmitter();
  @Output()
  rowPreview: EventEmitter<any> = new EventEmitter();
  @Output()
  rowPrint: EventEmitter<any> = new EventEmitter();

  @Input()
  loadingMessage!: string;

  /** list of fields that are searchable */
  /** list of fields that are searchable */
  searchFields!: string;
  showDelete: any = {};

  dataSource!: MatTableDataSource<any>;
  dataSourceToPrint!: MatTableDataSource<any>;

  displayedColumns!: string[];
  displayedColumnsPrint!: string[];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  pageSize: number = 10;

  @ViewChild('printPdf')
  printPdf!: ElementRef;
  constructor() {
    this.searchFieldControl = new FormControl('');
    if (this.tableConfigurations) {
      this.tableConfigurations.showSearch =
        this.tableConfigurations.showSearch !== null
          ? this.tableConfigurations.showSearch
          : true;
      this.tableConfigurations.allowPagination =
        this.tableConfigurations.allowPagination !== null
          ? this.tableConfigurations.allowPagination
          : true;
      this.tableConfigurations.showBorder =
        this.tableConfigurations.showBorder !== null
          ? this.tableConfigurations.showBorder
          : false;
      this.searchFields = this.tableConfigurations.tableColumns
        .map(column => column.name)
        .join(',');
      this.tableConfigurations.actionIcons = this.tableConfigurations
        .actionIcons
        ? this.tableConfigurations.actionIcons
        : {
          edit: false,
          delete: false,
          more: false,
          print: false,
          cancel: false
        };
    } else {
      this.tableConfigurations!.showSearch = true;
      this.tableConfigurations!.allowPagination = true;
      this.tableConfigurations!.showBorder = false;
      this.tableConfigurations!.actionIcons = {
        edit: false,
        delete: false,
        more: false,
        print: false,
        cancel: false,
      };
    }
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableList.sort(function (a: any, b: any) {
      a = new Date(a.created);
      b = new Date(b.created);
      return a > b ? -1 : a < b ? 1 : 0;
    }));
    this.dataSourceToPrint = new MatTableDataSource(this.tableList);

    const { edit, print, more, cancel } = this.tableConfigurations.actionIcons;
    const colums = ['position', ...this.tableConfigurations.tableColumns.map(column => column.name)];
    if (edit || print || more || cancel || this.tableConfigurations.actionIcons.delete) {
      this.displayedColumns = [...colums, 'action'];
      this.displayedColumnsPrint = colums;
    } else {
      this.displayedColumns = colums;
      this.displayedColumnsPrint = colums;
    }
    if (this.tableConfigurations.allowPagination) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.tableList.sort(function (a: any, b: any) {
      a = new Date(a.created);
      b = new Date(b.created);
      return a > b ? -1 : a < b ? 1 : 0;
    }));
    this.dataSourceToPrint = new MatTableDataSource(this.tableList);

    if (this.tableConfigurations.allowPagination) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  isNumber(item: any) {
    return !isNaN(item) || item === 'N/A';
  }

  viewItemDetails(itemId: any) {
    this.rowPreview.emit(itemId);
  }

  editItem(itemId: any) {
    this.rowUpdate.emit(itemId);
  }

  printItem(itemId: any) {
    this.rowPrint.emit(itemId);
  }

  deleteItem(itemId: any) {
    this.rowDelete.emit(itemId);
  }

  trackByFn(index: number, item: any) {
    return item ? item.id : undefined;
  }

  downloadToCsv() {
    const data = this.tableList.map((item) => {
      const object = {};
      for (const col of this.tableConfigurations.tableColumns) {
        object[col.name] = item[col.name] == null?'':item[col.name];
      }
      return object;
    });

    new Angular5Csv(data, 'My Report', { headers: this.tableConfigurations.tableColumns.map(col => col.label) });
  }

  browserPrint() {
    this.paginator.pageSize = 100;
    this.paginator.nextPage();
    setTimeout(() => window.print(), 5000);
  }

  exportPdf() {
    this.print(this.printPdf.nativeElement, this.tableConfigurations.tableCaption);
  }

  public print(printEl: HTMLElement, title: string) {
    const mywindow = window.open('', 'PRINT', '');
    const style = '<style>' +
      'table {\n' +
      '    width:100%;' +
      '    margin-bottom:20px\n' +
      '}\n' +
      'table.table {\n' +
      '    border:solid #000 !important;\n' +
      '    border-width:1px 0 0 1px !important;\n' +
      '}\n' +
      '.table th, .table td {\n' +
      '    border:solid #000 !important;\n' +
      '    border-width:0 1px 1px 0 !important;\n' +
      '}' +
      '</style>';
    mywindow.document.write(style + printEl.innerHTML);
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    setTimeout(function () {
      mywindow.print();
      mywindow.close();
    });
  }

}
