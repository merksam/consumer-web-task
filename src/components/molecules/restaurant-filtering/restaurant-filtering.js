import React from 'react';

import { Heading } from '../../atoms/heading';
import styles from './restaurant-filtering-style.scss';
import { translateCuisine } from '../../../mechanisms/l10n/client/translation-helper';
import { Divider } from '../../atoms/divider';

export const RestaurantFiltering = props => {
  const {
    translationMap,
    deliveryTypes,
    cuisines,
    selectedCuisines,
    selectedDeliveryType,
    filterRestaurantListByDeliveryType,
    filterRestaurantListByCuisine,
    isLoading,
    translate,
    intl,
  } = props;

  const onChangeDeliveryType = event => filterRestaurantListByDeliveryType(event.target.value);
  const onChangeCuisine = event => filterRestaurantListByCuisine(event.target.value);

  return (
    <div>
      <Heading level={6} align="left">
        {translate('deliveryTypeLabel')}
      </Heading>
      {deliveryTypes.map(deliveryType => (
        <label key={deliveryType} className={styles['filter-option']}>
          <input
            disabled={isLoading}
            type="radio"
            name="restaurantFilteringByDeliveryType"
            value={deliveryType}
            onChange={onChangeDeliveryType}
            checked={selectedDeliveryType === deliveryType}
          />{' '}
          {translate(translationMap[deliveryType])}
        </label>
      ))}
      <Divider />
      <Heading level={6} align="left">
        {translate('cuisineTypeLabel')}
      </Heading>
      {cuisines.map(cuisine => (
        <label key={cuisine} className={styles['filter-option']}>
          <input
            disabled={isLoading}
            type="checkbox"
            name="restaurantFilteringByCuisine"
            value={cuisine}
            onChange={onChangeCuisine}
            checked={selectedCuisines[cuisine]}
          />{' '}
          {translateCuisine(intl, cuisine.toLowerCase())}
        </label>
      ))}
    </div>
  );
};
