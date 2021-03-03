export default class RestaurantItemModel {
  static getId(restaurantData) {
    return restaurantData.id;
  }

  static getName(restaurantData) {
    return restaurantData.name;
  }

  static getLogotype(restaurantData) {
    return restaurantData.restaurantLogo;
  }

  static getCuisines(restaurantData) {
    return restaurantData.cuisines;
  }

  static getMOV(restaurantData) {
    // @todo error proof
    return restaurantData.info.minimumOrderValue;
  }

  static getRating(restaurantData) {
    // @todo error proof
    return restaurantData.info.ratings.score.median;
  }

  static getDeliveryTime(restaurantData) {
    // @todo error proof
    if (!restaurantData.shipping) {
      return null;
    }
    return restaurantData.shipping.estimatedTime;
    //
    // let hours = 0;
    // const minutes = time % 60;
    //
    // if (time > 60) {
    //   hours = (time - minutes) / 60;
    // }
    //
    // return { hours, minutes };
  }
}
