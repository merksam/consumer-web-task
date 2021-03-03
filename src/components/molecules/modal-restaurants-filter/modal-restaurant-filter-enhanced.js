import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { translate } from '../../../mechanisms/l10n/hoc/translate';
import {
  restaurantsListAggregatesSelector,
  restaurantsListIsLoadingSelector,
} from '../../../logic/restaurants-list/ducks/restaurant-list';
import {
  filterRestaurantList,
  restaurantFilteringCuisinesSelector,
  restaurantFilteringDeliveryTypeSelector,
} from '../../../logic/restaurant-filtering/ducks/restaurant-filtering-reducer';
import RestaurantListFilteringModel from '../../../logic/restaurant-filtering/models/restaurant-filtering-model';
import {
  restaurantSortingTypeSelector,
  sortRestaurantList,
} from '../../../logic/restaurant-sorting/ducks/restaurant-sorting-reducer';
import RestaurantListSortingModel from '../../../logic/restaurant-sorting/models/restaurant-sorting-model';
import { ModalRestaurantFilter } from './modal-restaurant-filter';

const mapStateToProps = state => ({
  isLoading: restaurantsListIsLoadingSelector(state),
  selectedCuisines: restaurantFilteringCuisinesSelector(state),
  selectedDeliveryType: restaurantFilteringDeliveryTypeSelector(state),
  selectedSortingType: restaurantSortingTypeSelector(state),

  cuisines: (() => {
    // @todo is it okay to get options from aggregates? Is it something like taxonomy?
    const cuisines = restaurantsListAggregatesSelector(state).cuisines || [];
    return RestaurantListFilteringModel.getCuisinesArray(cuisines);
  })(),
  deliveryTypes: RestaurantListFilteringModel.getDeliveryTypesArray(),
  sortingTypes: RestaurantListSortingModel.getSortingTypesArray(),

  filteringTranslationMap: RestaurantListFilteringModel.getTranslationsMap(),
  sortingTranslationMap: RestaurantListSortingModel.getTranslationsMap(),
});

const mapDispatchToProps = dispatch => {
  return {
    // @todo should we created separated action type and single reducer instead of 2 different?
    updateFilterAndSearch: value => {
      dispatch(sortRestaurantList({ sortingType: value.sortingType }));
      dispatch(
        filterRestaurantList({
          deliveryType: value.deliveryType,
          cuisines: value.cuisines,
        }),
      );
    },
  };
};

export const ModalRestaurantFilterEnhanced = flow(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  translate('components'),
)(ModalRestaurantFilter);
