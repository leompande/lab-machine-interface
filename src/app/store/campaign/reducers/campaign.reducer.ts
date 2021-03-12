import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Campaign } from './campaign';
import { CampaignActions, CampaignActionTypes } from '../actions/campaign.actions';

export interface State extends EntityState<Campaign> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Campaign> = createEntityAdapter<Campaign>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});



export function reducer(
  state = initialState,
  action: CampaignActions
): State {
  switch (action.type) {
    case CampaignActionTypes.LoadCampaigns: {
      return { ...state, loading: true };
    }


    case CampaignActionTypes.DoneLoading: {
      return { ...state, loading: false };
    }

    case CampaignActionTypes.LoadCampaignsFailure: {
      return { ...state, loading: false };
    }

    case CampaignActionTypes.AddCampaign: {
      return adapter.addOne(action.payload.Campaign, state);
    }

    case CampaignActionTypes.UpsertCampaign: {
      return adapter.upsertOne(action.payload.Campaign, state);
    }

    case CampaignActionTypes.AddCampaigns: {
      return adapter.addMany(action.payload.Campaigns, state);
    }


    case CampaignActionTypes.SelectCampaign: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case CampaignActionTypes.UpsertCampaigns: {
      return adapter.upsertMany(action.payload.Campaigns, state);
    }

    case CampaignActionTypes.UpdateCampaign: {
      return adapter.updateOne(action.payload.Campaign, state);
    }

    case CampaignActionTypes.UpdateCampaigns: {
      return adapter.updateMany(action.payload.Campaigns, state);
    }

    case CampaignActionTypes.DeleteCampaign: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CampaignActionTypes.DeleteCampaigns: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CampaignActionTypes.LoadCampaignsSuccess: {
      return adapter.addAll(action.payload.Campaigns, state);
    }

    case CampaignActionTypes.ClearCampaigns: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selected;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
