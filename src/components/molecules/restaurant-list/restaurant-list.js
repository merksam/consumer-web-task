import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';

import RestaurantItemModel from '../../../logic/restaurant-item/models/restaurant-item-model';

import styles from './restaurant-list-style.scss';

import { RestaurantItem } from '../restaurant-item';
import { RestaurantPropType } from '../restaurant-item/restaurant-item-prop-types';
import { RestaurantListMetaPropType } from './restaurant-list-prop-types';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  meta: RestaurantListMetaPropType.isRequired,
  list: PropTypes.arrayOf(RestaurantPropType.isRequired).isRequired,
};

export const RestaurantList = ({ isLoading, list = [], meta }) => {
  const onRestaurantClick = restaurant => {
    //@todo #R1.1
    console.log(restaurant.slug);
  };

  const classNames = classnames(styles['list'], { [styles['loading']]: isLoading });

  return (
    <div className={classNames}>
      {list.map(restaurantItem => (
        <RestaurantItem
          className={styles['restaurant-item']}
          meta={meta}
          key={RestaurantItemModel.getId(restaurantItem)}
          onClick={() => onRestaurantClick(restaurantItem)}
          restaurant={restaurantItem}
        />
      ))}
    </div>
  );
};

RestaurantList.propTypes = propTypes;
