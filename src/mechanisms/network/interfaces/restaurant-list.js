import { restaurantList } from './restaurants-list-mock-data';
import RestaurantListSortingModel from '../../../logic/restaurant-sorting/models/restaurant-sorting-model';

// ****************** HERE WE ARE EMULATING THINGS **********************
// code from here will never go to production, as we will make real fetch
// **********************************************************************
import RestaurantListModel from '../../../logic/restaurants-list/models/restaurant-list-model';
import RestaurantListFiltering from '../../../logic/restaurant-filtering/models/restaurant-filtering-model';
import orderBy from 'lodash/orderBy';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const filterByCuisines = (restaurantsResponse, cuisines) => {
  let restaurants = RestaurantListModel.getDataFromResponse(restaurantsResponse);
  if (Object.keys(cuisines).length) {
    restaurants = restaurants.filter(restaurant => {
      return restaurant.cuisines.some(cuisine => cuisines[cuisine]);
    });
  }
  return {
    ...restaurantsResponse,
    data: restaurants,
  };
};

const filterByDeliveryType = (restaurantsResponse, deliveryType) => {
  let restaurants = RestaurantListModel.getDataFromResponse(restaurantsResponse);
  switch (deliveryType) {
    case RestaurantListFiltering.DELIVERY_TYPES.DELIVERY_FILTERING:
      restaurants = restaurants.filter(item => item.shipping.type.includes('delivery'));
      break;
    case RestaurantListFiltering.DELIVERY_TYPES.PICKUP_FILTERING:
      restaurants = restaurants.filter(item => item.shipping.type.includes('pickup'));
      break;
    default:
  }
  return {
    ...restaurantsResponse,
    data: restaurants,
  };
};

const sort = (restaurantsResponse, sortingType) => {
  let restaurants = RestaurantListModel.getDataFromResponse(restaurantsResponse);
  switch (sortingType) {
    case RestaurantListSortingModel.TYPES.MINIMUM_ORDER_VALUE_SORTING:
      restaurants = orderBy(restaurants, ['info.minimumOrderValue'], ['asc']);
      break;
    case RestaurantListSortingModel.TYPES.ALPHABETICAL_SORTING:
      restaurants = orderBy(restaurants, [restaurant => restaurant.name.toLowerCase()], ['asc']);
      break;
    case RestaurantListSortingModel.TYPES.DELIVERY_TIME_SORTING:
      restaurants = orderBy(restaurants, ['shipping.estimatedTime'], ['asc']);
      break;
    case RestaurantListSortingModel.TYPES.RATING_SORTING:
      restaurants = orderBy(restaurants, ['info.ratings.score.median'], ['desc']);
      break;
    default:
  }
  return {
    ...restaurantsResponse,
    data: restaurants,
  };
};

export default class RestaurantListInterface {
  constructor(params = { name: 'Restaurants' }) {
    const { name } = params;
    this.name = name;
  }

  static async fetch({ sortingType, deliveryType, cuisines }) {
    await delay(2000);
    let restaurantsResponse = restaurantList;
    restaurantsResponse = filterByCuisines(restaurantsResponse, cuisines);
    restaurantsResponse = filterByDeliveryType(restaurantsResponse, deliveryType);
    restaurantsResponse = sort(restaurantsResponse, sortingType);
    return restaurantsResponse;
  }

  async fetchList({ sortingType, deliveryType, cuisines }) {
    const list = await RestaurantListInterface.fetch({ sortingType, deliveryType, cuisines });
    return list;
  }
}
