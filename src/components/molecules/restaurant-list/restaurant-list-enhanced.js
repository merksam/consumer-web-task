import { connect } from 'react-redux';

import {
  restaurantsListSelector,
  restaurantsListIsLoadingSelector,
  restaurantsListMetaSelector,
} from '../../../logic/restaurants-list/ducks/restaurant-list';

import { RestaurantList } from './restaurant-list';

const mapStateToProps = state => ({
  isLoading: restaurantsListIsLoadingSelector(state),
  list: restaurantsListSelector(state),
  meta: restaurantsListMetaSelector(state),
});

const mapDispatchToProps = {};

export const RestaurantListEnhanced = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantList);
