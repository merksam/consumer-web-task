import { connect } from 'react-redux';
import flow from 'lodash/flow';

import {
  restaurantsListSelector,
  restaurantsListIsLoadingSelector,
  restaurantsListMetaSelector,
} from '../../../logic/restaurants-list/ducks/restaurant-list';

import { RestaurantList } from './restaurant-list';
import { translate } from '../../../mechanisms/l10n/hoc/translate';

const mapStateToProps = state => ({
  isLoading: restaurantsListIsLoadingSelector(state),
  list: restaurantsListSelector(state),
  meta: restaurantsListMetaSelector(state),
});

const mapDispatchToProps = {};

export const RestaurantListEnhanced = flow(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  translate('components.restaurantList'),
)(RestaurantList);
