import { UserEffects } from './user/effects/user.effects';
import { AgencyEffects } from './agency/effects/agency.effects';
import { CampaignEffects } from './campaign/effects/campaign.effects';
import { SignBoardEffects } from './sign-board/effects/sign-board.effects';
import { ApplicationEffects } from './application/effects/application.effects';
import { OrganisationEffects } from './organisation/effects/organisation.effects';
import { UserRoleEffects } from './user-role/effects/user-role.effects';
import { OutletEffects } from './outlet/effects/outlet.effects';
import { SignBoardBatchEffects } from './sign-board-batch/effects/sign-board-batch.effects';
import { AssignedBoardBatchEffects } from './assigned-board-batches/effects/assigned-board-batch.effects';

export const effects = [
  OutletEffects,
  UserEffects,
  AgencyEffects,
  CampaignEffects,
  SignBoardEffects,
  SignBoardBatchEffects,
  AssignedBoardBatchEffects,
  ApplicationEffects,
  OrganisationEffects,
  UserRoleEffects,
  OrganisationEffects
];
