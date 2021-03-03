export default class RestaurantListFiltering {
  static getDeliveryTypesArray() {
    return Object.values(RestaurantListFiltering.DELIVERY_TYPES);
  }

  static getCuisinesArray(cuisines) {
    return Object.values(cuisines);
  }

  static getTranslationsMap() {
    return RestaurantListFiltering.TRANSLATIONS_MAP;
  }
}

RestaurantListFiltering.DELIVERY_TYPES = {
  DELIVERY_FILTERING: 'DELIVERY_FILTERING',
  PICKUP_FILTERING: 'PICKUP_FILTERING',
};

RestaurantListFiltering.TRANSLATIONS_MAP = {
  DELIVERY_FILTERING: 'delivery',
  PICKUP_FILTERING: 'pickup',
};
