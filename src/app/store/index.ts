import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromUser from './user/reducers/user.reducer';
import * as fromUserRole from './user-role/reducers/user-role.reducer';
import * as fromSignBoard from './sign-board/reducers/sign-board.reducer';
import * as fromSignBoardBatch from './sign-board-batch/reducers/sign-board-batch.reducer';
import * as fromAssignedBoardBatch from './assigned-board-batches/reducers/assigned-board-batch.reducer';
import * as fromOrganisation from './organisation/reducers/organisation.reducer';
import * as fromAgency from './agency/reducers/agency.reducer';
import * as fromApplication from './application/reducers/application.reducer';
import * as fromCampaign from './campaign/reducers/campaign.reducer';
import * as fromOrganisationUnits from './organization-unit/organization-unit.reducer';
import * as fromOutlets from './outlet/reducers/outlet.reducer';

import { environment } from '../../environments/environment';
import { RouterStateUrl } from './router/router.reducer';

export interface ApplicationState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  user: fromUser.State;
  userRole: fromUserRole.State;
  signBoard: fromSignBoard.State;
  signBoardBatch: fromSignBoardBatch.State;
  assignedBoardBatch: fromAssignedBoardBatch.State;
  application: fromApplication.State;
  organisation: fromOrganisation.State;
  campaign: fromCampaign.State;
  agency: fromAgency.State;
  organisationUnits: fromOrganisationUnits.State,
  outlet: fromOutlets.State
}

export const reducers: ActionReducerMap<ApplicationState> = {
  routerReducer: fromRouter.routerReducer,
  user: fromUser.reducer,
  userRole: fromUserRole.reducer,
  signBoard: fromSignBoard.reducer,
  signBoardBatch: fromSignBoardBatch.reducer,
  assignedBoardBatch: fromAssignedBoardBatch.reducer,
  application: fromApplication.reducer,
  organisation: fromOrganisation.reducer,
  campaign: fromCampaign.reducer,
  agency: fromAgency.reducer,
  organisationUnits: fromOrganisationUnits.reducer,
  outlet: fromOutlets.reducer
};

export const metaReducers: MetaReducer<
  ApplicationState
>[] = !environment.production ? [] : [];

export const getRouteState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');
