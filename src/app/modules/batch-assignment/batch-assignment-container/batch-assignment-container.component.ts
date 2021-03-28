import { Component, OnInit } from '@angular/core';
import { AssignedBoardBatch } from 'src/app/store/assigned-board-batches/reducers/assigned-board-batch';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as assignedBatchSelector from '../../../store/assigned-board-batches/selectors/assigned-board-batch.selectors';

@Component({
  selector: 'app-batch-assignment-container',
  templateUrl: './batch-assignment-container.component.html',
  styleUrls: ['./batch-assignment-container.component.scss']
})
export class BatchAssignmentContainerComponent implements OnInit {

  assignedBatches$: Observable<AssignedBoardBatch[]>;
  assignedBatchEntities$: Observable<{[id: string]: AssignedBoardBatch}>;
  assignedBatchLoading$: Observable<any>;
  constructor(private store: Store<ApplicationState>) {
    this.assignedBatches$ = this.store.pipe(select(assignedBatchSelector.selectAll));
    this.assignedBatchEntities$ = this.store.pipe(select(assignedBatchSelector.selectEntities));
    this.assignedBatchLoading$ = this.store.pipe(select(assignedBatchSelector.selectLoading));
  }

  ngOnInit(): void {
  }

}
