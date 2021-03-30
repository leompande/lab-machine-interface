import { campaignMetadata } from './services/metadata-mapping/campaign-metadata.mapping';
import { signBoardMetadata } from './services/metadata-mapping/sign-board-metadata.mapping';
import { signBoardBatchMetadata } from './services/metadata-mapping/sign-board-batch-metadata.mapping';
import { assignedBatchMetadata } from './services/metadata-mapping/assignment-metadata.mapping';
import { outletAssignmentMetadata } from './services/metadata-mapping/outlet-assignment-metadata.mapping';

export const TrackedEntityTypes = {
  Campaigns: campaignMetadata,
  SignBoards: signBoardMetadata,
  SignBoardBatches: signBoardBatchMetadata,
  AssignedBatchMetadata: assignedBatchMetadata,
  OutletAssignmentMetadata: outletAssignmentMetadata
};
