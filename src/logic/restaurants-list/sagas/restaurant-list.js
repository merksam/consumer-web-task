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

export function* restaurantsListFetchHandler(action) {
  try {
    const network = networkInterfaceFactory();

    const sortingType = yield select(restaurantSortingTypeSelector);

    yield put(fetchRestaurantListStarted());
    const restaurantsListResponse = yield network.Restaurants.fetchList({ sortingType });

    const restaurantsList = RestaurantListModel.getDataFromResponse(restaurantsListResponse);
    const meta = RestaurantListModel.getMetaFromResponce(restaurantsListResponse);
    const aggregates = RestaurantListModel.getAggregatesFromResponce(restaurantsListResponse);

    yield put(fetchRestaurantListSucceeded({ restaurantsList, meta, aggregates }));
  } catch (e) {
    yield put(fetchRestaurantListFailed({ e }));
  }
}

export function* restaurantsListSaga() {
  yield takeEvery(RESTAURANT_LIST_REQUESTED, restaurantsListFetchHandler);
  yield takeEvery(RESTAURANT_LIST_SORTING_CHANGED, restaurantsListFetchHandler);
}
