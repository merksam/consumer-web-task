import React from 'react';

import { Heading } from '../../atoms/heading';

import styles from './restaurant-sorting-style.scss';

export const RestaurantSorting = props => {
  const {
    sortingTypes,
    translationMap,
    selectedSortingType,
    isLoading,
    translate,
    onChange,
  } = props;

  const onChangeSorting = event => onChange({ sortingType: event.target.value });

  return (
    <div>
      <Heading level={6} align="left">
        {translate('label')}
      </Heading>
      {sortingTypes.map(sortingType => (
        <label key={sortingType} className={styles['restaurant-sorting']}>
          <input
            disabled={isLoading}
            type="radio"
            name="restaurantSorting"
            value={sortingType}
            onChange={onChangeSorting}
            checked={selectedSortingType === sortingType}
          />{' '}
          {translate(translationMap[sortingType])}
        </label>
      ))}
    </div>
  );
};
