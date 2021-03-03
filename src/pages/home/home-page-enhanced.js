import flow from 'lodash/flow';

import { translate } from '../../mechanisms/l10n/hoc/translate';
import { HomePage } from './home-page';
import { connect } from 'react-redux';
import RestaurantsListApi from '../../logic/restaurants-list/api/restaurants-list-api';
import { restaurantsListIsLoadingSelector } from '../../logic/restaurants-list/ducks/restaurant-list';

const mapStateToProps = state => ({
  isLoading: restaurantsListIsLoadingSelector(state),
});

export const HomePageEnhanced = flow(
  translate('pages.home'),
  connect(mapStateToProps),
)(HomePage);

HomePageEnhanced.loadUniversalData = async function({ store, router, network }) {
  await store.callSaga(RestaurantsListApi.fetchUniversalData);
};

HomePageEnhanced.loadClientOnlyData = async function({ store, router, network }) {};
