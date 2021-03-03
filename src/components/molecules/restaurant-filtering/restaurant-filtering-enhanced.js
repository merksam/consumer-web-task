import { connect } from 'react-redux';
import flow from 'lodash/flow';

import { RestaurantFiltering } from './restaurant-filtering';
import { translate } from '../../../mechanisms/l10n/hoc/translate';
import {
  restaurantFilteringCuisinesSelector,
  restaurantFilteringDeliveryTypeSelector,
  filterRestaurantListByCuisine,
  filterRestaurantListByDeliveryType,
} from '../../../logic/restaurant-filtering/ducks/restaurant-filtering-reducer';
import RestaurantListFilteringModel from '../../../logic/restaurant-filtering/models/restaurant-filtering-model';
import {
  restaurantsListIsLoadingSelector,
  restaurantsListAggregatesSelector,
} from '../../../logic/restaurants-list/ducks/restaurant-list';

const mapStateToProps = state => ({
  isLoading: restaurantsListIsLoadingSelector(state),
  selectedCuisines: restaurantFilteringCuisinesSelector(state),
  selectedDeliveryType: restaurantFilteringDeliveryTypeSelector(state),
  cuisines: (() => {
    // @todo is it okay to get options from aggregates? Is this data dependent of what we have in response?
    const cuisines = restaurantsListAggregatesSelector(state).cuisines || [];
    return RestaurantListFilteringModel.getCuisinesArray(cuisines);
  })(),
  deliveryTypes: RestaurantListFilteringModel.getDeliveryTypesArray(),
  translationMap: RestaurantListFilteringModel.getTranslationsMap(),
});

const mapDispatchToProps = {
  filterRestaurantListByCuisine,
  filterRestaurantListByDeliveryType,
};

export const RestaurantFilteringEnhanced = flow(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  translate('components.restaurantFiltering'),
)(RestaurantFiltering);
