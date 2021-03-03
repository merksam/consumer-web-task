import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';

import RestaurantItemModel from '../../../logic/restaurant-item/models/restaurant-item-model';

import styles from './restaurant-list-style.scss';

import { RestaurantItem } from '../restaurant-item';
import { RestaurantPropType } from '../restaurant-item/restaurant-item-prop-types';
import { RestaurantListMetaPropType } from './restaurant-list-prop-types';
import { Heading } from '../../atoms/heading';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  meta: RestaurantListMetaPropType.isRequired,
  translate: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(RestaurantPropType.isRequired).isRequired,
};

export const RestaurantList = ({ isLoading, list = [], meta, translate }) => {
  const onRestaurantClick = restaurant => {
    console.log(restaurant.slug);
  };

  const classNames = classnames(styles.list, { [styles.loading]: isLoading });

  return (
    <div className={classNames}>
      {list.length ? (
        list.map(restaurantItem => (
          <RestaurantItem
            className={styles['restaurant-item']}
            meta={meta}
            key={RestaurantItemModel.getId(restaurantItem)}
            onClick={() => onRestaurantClick(restaurantItem)}
            restaurant={restaurantItem}
          />
        ))
      ) : (
        <Heading level={5} align="left">
          {translate('noResults')}
        </Heading>
      )}
    </div>
  );
};

RestaurantList.propTypes = propTypes;
