import get from 'lodash/get';
import omit from 'lodash/omit';
import RestaurantListFiltering from '../models/restaurant-filtering-model';

// -------------------------------------------------------------------------------------------------
// Event types
// -------------------------------------------------------------------------------------------------

export const RESTAURANT_LIST_FILTERING_CHANGED = 'RESTAURANT_LIST_FILTERING_CHANGED';

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

const initialState = {
  cuisines: {},
  deliveryType: RestaurantListFiltering.DEFAULT_FILTERING_TYPE,
};

export function restaurantListFiltering(state = initialState, action) {
  switch (action.type) {
    case RESTAURANT_LIST_FILTERING_CHANGED:
      return {
        ...state,
        deliveryType: action.payload.deliveryType || state.deliveryType,
        cuisines: action.payload.cuisines || state.cuisines,
      };
    default:
      return state;
  }
}

// -------------------------------------------------------------------------------------------------
// Event creators
// -------------------------------------------------------------------------------------------------

export const filterRestaurantList = ({ deliveryType, cuisines }) => {
  return {
    type: RESTAURANT_LIST_FILTERING_CHANGED,
    payload: { deliveryType, cuisines },
  };
};

// -------------------------------------------------------------------------------------------------
// Selectors
// -------------------------------------------------------------------------------------------------

const rootSelector = state => get(state, 'restaurantFiltering', initialState);

export const restaurantFilteringCuisinesSelector = state => rootSelector(state).cuisines;
export const restaurantFilteringDeliveryTypeSelector = state => rootSelector(state).deliveryType;
