import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { fadeIn } from '../../animations/router-animation';
import * as _ from 'lodash';
import { ListItem } from '../one-sided-multi-select/one-sided-multi-select.component';

@Component({
  selector: 'app-board-collector',
  templateUrl: './board-collector.component.html',
  styleUrls: ['./board-collector.component.scss'],
  animations: [fadeIn]
})
export class BoardCollectorComponent implements OnInit {
  @Input() boardList: {
    outlet: string,
    agency: string,
    boardWidth: number, boardHeight: number, boardQuantity: number
  }[] = [];
  @Input() agencies: any[];
  @Input() outlets: any[];
  boardHeight: number;
  boardWidth: number;
  boardQuantity: number;
  @Output() onItemChanges = new EventEmitter();

  availableAgencies: ListItem[];
  availableOutlets: ListItem[];
  filteredOutlets: ListItem[];
  selectedAgency: string;
  selectedOutlet: string;

  chosedOutlet: any = [];
  chosedAgency: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectionAgencyDone(event) {
    this.selectedAgency = event[0].name;
  }

  onSelectionOutletDone(event) {
    this.selectedOutlet = event[0].name;
  }
  addConfiguration() {
    if (!this.boardList.find(board => board.agency == this.selectedAgency && board.outlet == this.selectedOutlet && board.boardHeight == this.boardHeight && board.boardWidth == this.boardWidth)) {
      this.boardList = [
        ...this.boardList,
        {
          outlet: this.selectedOutlet,
          agency: this.selectedAgency,
          boardHeight: this.boardHeight,
          boardWidth: this.boardWidth,
          boardQuantity: this.boardQuantity
        }
      ];
      this.boardHeight = null;
      this.boardWidth = null;
      this.boardQuantity = null;
      this.chosedAgency = [];
      this.chosedOutlet = [];
      this.onItemChanges.emit(this.boardList);
    }
  }

  remove(index: number) {
    _.remove(this.boardList, (element: any, elementIndex: number) => elementIndex === index);
    this.onItemChanges.emit(this.boardList);
  }

}
