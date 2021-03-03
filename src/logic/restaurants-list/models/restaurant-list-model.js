import get from 'lodash/get';

export default class RestaurantsListModel {
  static getDataFromResponse(response) {
    return get(response, 'data', []);
  }

  static getMetaFromResponse(response) {
    return get(response, 'meta', {});
  }

  static getAggregatesFromResponse(response) {
    return get(response, 'aggregates', {});
  }
}
