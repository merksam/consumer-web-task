import { takeEvery, put, select } from 'redux-saga/effects';
import {
  RESTAURANT_LIST_REQUESTED,
  fetchRestaurantList,
  fetchRestaurantListStarted,
  fetchRestaurantListSucceeded,
  fetchRestaurantListFailed,
} from '../ducks/restaurant-list';

import {
  RESTAURANT_LIST_SORTING_CHANGED,
  restaurantSortingTypeSelector,
} from '../../restaurant-sorting/ducks/restaurant-sorting-reducer';

import RestaurantListModel from '../models/restaurant-list-model';

import networkInterfaceFactory from '../../../mechanisms/network/server-network-interface-factory';
import {
  RESTAURANT_LIST_FILTERING_CHANGED,
  restaurantFilteringCuisinesSelector,
  restaurantFilteringDeliveryTypeSelector,
} from '../../restaurant-filtering/ducks/restaurant-filtering-reducer';

export function* restaurantsListFetchHandler(action) {
  try {
    const network = networkInterfaceFactory();

    const sortingType = yield select(restaurantSortingTypeSelector);
    const deliveryType = yield select(restaurantFilteringDeliveryTypeSelector);
    const cuisines = yield select(restaurantFilteringCuisinesSelector);

    yield put(fetchRestaurantListStarted());
    const restaurantsListResponse = yield network.Restaurants.fetchList({
      sortingType,
      deliveryType,
      cuisines,
    });

    const restaurantsList = RestaurantListModel.getDataFromResponse(restaurantsListResponse);
    const meta = RestaurantListModel.getMetaFromResponse(restaurantsListResponse);
    const aggregates = RestaurantListModel.getAggregatesFromResponse(restaurantsListResponse);

    yield put(fetchRestaurantListSucceeded({ restaurantsList, meta, aggregates }));
  } catch (e) {
    yield put(fetchRestaurantListFailed({ e }));
  }
}

export function* restaurantsListSaga() {
  yield takeEvery(RESTAURANT_LIST_REQUESTED, restaurantsListFetchHandler);
  yield takeEvery(RESTAURANT_LIST_SORTING_CHANGED, restaurantsListFetchHandler);
  yield takeEvery(RESTAURANT_LIST_FILTERING_CHANGED, restaurantsListFetchHandler);
}
