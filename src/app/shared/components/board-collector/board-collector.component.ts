import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { fadeIn } from '../../animations/router-animation';
import * as _ from 'lodash';

@Component({
  selector: 'app-board-collector',
  templateUrl: './board-collector.component.html',
  styleUrls: ['./board-collector.component.scss'],
  animations: [fadeIn]
})
export class BoardCollectorComponent implements OnInit {
  @Input() boardList: { boardWidth: number, boardHeight: number, boardQuantity: number }[] = [];
  boardHeight: number;
  boardWidth: number;
  boardQuantity: number;
  @Output() onItemChanges = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addConfiguration() {
    if (!this.boardList.find(board => board.boardHeight == this.boardHeight && board.boardWidth == this.boardWidth)) {
      this.boardList = [
        ...this.boardList,
        {
          boardHeight: this.boardHeight,
          boardWidth: this.boardWidth,
          boardQuantity: this.boardQuantity
        }
      ];
      this.boardHeight = null;
      this.boardWidth = null;
      this.boardQuantity = null;
      this.onItemChanges.emit(this.boardList);
    }
  }

  remove(index: number) {
    _.remove(this.boardList, (element: any, elementIndex: number) => elementIndex === index);
    this.onItemChanges.emit(this.boardList);
  }

}
