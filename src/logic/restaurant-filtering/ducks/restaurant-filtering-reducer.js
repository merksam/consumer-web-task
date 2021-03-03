import get from 'lodash/get';
import omit from 'lodash/omit';
import RestaurantListFiltering from '../models/restaurant-filtering-model';

// -------------------------------------------------------------------------------------------------
// Event types
// -------------------------------------------------------------------------------------------------

export const RESTAURANT_LIST_FILTERING_CHANGED_DELIVERY_TYPE =
  'RESTAURANT_LIST_FILTERING_CHANGED_DELIVERY_TYPE';
export const RESTAURANT_LIST_FILTERING_CHANGED_CUISINE =
  'RESTAURANT_LIST_FILTERING_CHANGED_CUISINE';

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

const initialState = {
  cuisines: {},
  deliveryType: RestaurantListFiltering.DELIVERY_TYPES.DELIVERY_FILTERING,
};

export function restaurantListFiltering(state = initialState, action) {
  switch (action.type) {
    case RESTAURANT_LIST_FILTERING_CHANGED_DELIVERY_TYPE:
      return {
        ...state,
        deliveryType: action.payload.deliveryType,
      };
    case RESTAURANT_LIST_FILTERING_CHANGED_CUISINE:
      if (state.cuisines[action.payload.cuisine]) {
        return {
          ...state,
          cuisines: omit(state.cuisines, action.payload.cuisine),
        };
      }
      return {
        ...state,
        cuisines: {
          ...state.cuisines,
          [action.payload.cuisine]: action.payload.cuisine,
        },
      };
    default:
      return state;
  }
}

// -------------------------------------------------------------------------------------------------
// Event creators
// -------------------------------------------------------------------------------------------------

export const filterRestaurantListByCuisine = cuisine => {
  return {
    type: RESTAURANT_LIST_FILTERING_CHANGED_CUISINE,
    payload: { cuisine },
  };
};
export const filterRestaurantListByDeliveryType = deliveryType => {
  return {
    type: RESTAURANT_LIST_FILTERING_CHANGED_DELIVERY_TYPE,
    payload: { deliveryType },
  };
};

// -------------------------------------------------------------------------------------------------
// Selectors
// -------------------------------------------------------------------------------------------------

const rootSelector = state => get(state, 'restaurantFiltering', initialState);

export const restaurantFilteringCuisinesSelector = state => rootSelector(state).cuisines;
export const restaurantFilteringDeliveryTypeSelector = state => rootSelector(state).deliveryType;
