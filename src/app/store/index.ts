import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromAgency from './agency/reducers/agency.reducer';

import { environment } from '../../environments/environment';
import { RouterStateUrl } from './router/router.reducer';

export interface ApplicationState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  routerReducer: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<
  ApplicationState
>[] = !environment.production ? [] : [];

export const getRouteState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');
