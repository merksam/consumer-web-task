import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import noop from 'lodash/noop';

import styles from './restaurant-item-style.scss';
import { Card } from '../card';
import RestaurantItemModel from '../../../logic/restaurant-item/models/restaurant-item-model';
import { RestaurantPropType } from './restaurant-item-prop-types';
import { RestaurantListMetaPropType } from '../restaurant-list/restaurant-list-prop-types';
import { Heading } from '../../atoms/heading';
import { translateCuisine } from '../../../mechanisms/l10n/client/translation-helper';
import { Rating } from '../../atoms/rating';

const propTypes = {
  meta: RestaurantListMetaPropType.isRequired,
  restaurant: RestaurantPropType.isRequired,
  translate: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  intl: intlShape.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  onClick: noop,
  className: undefined,
};

const formatMOV = (amount, currencyMeta) => {
  const value = (amount / currencyMeta.denominator).toFixed(2);
  const currencySignMap = {
    euro: '€',
    dollar: '$',
  };
  return currencySignMap[currencyMeta.type] + value;
};

export const RestaurantItem = props => {
  const { restaurant, onClick, meta, translate, intl, className } = props;

  const name = RestaurantItemModel.getName(restaurant);
  const logotype = RestaurantItemModel.getLogotype(restaurant);
  const cuisines = RestaurantItemModel.getCuisines(restaurant);

  //@todo #R1.2
  const minimumOrderValue = RestaurantItemModel.getMOV(restaurant);
  const rating = RestaurantItemModel.getRating(restaurant);
  const deliveryTime = RestaurantItemModel.getDeliveryTime(restaurant);

  const renderCuisines = () => {
    return cuisines
      .map(cuisine => translateCuisine(intl, cuisine))
      .filter(Boolean)
      .join(', ');
  };

  const renderMOV = () => {
    return (
      <div className={styles['ordering-info-item']}>
        {translate('minimumOrderValue')} {formatMOV(minimumOrderValue, meta.currency)}
      </div>
    );
  };

  const renderDeliveryTime = () => {
    return (
      <div className={styles['ordering-info-item']}>
        {deliveryTime}
        {translate('minutes')}
      </div>
    );
  };

  return (
    <Card className={className} onClick={onClick}>
      <div className={styles['content']}>
        <div className={styles['image-holder']}>
          <img src={logotype} className={styles['image']} />
        </div>
        <div className={styles['info']}>
          <div className={styles['header']}>
            <Heading level={5}>{name}</Heading>
            <Rating className={styles['rating']} value={rating} />
          </div>
          <div className={styles['cuisines']}>{renderCuisines()}</div>
          <div className={styles['ordering-info']}>
            {renderMOV()}
            {renderDeliveryTime()}
          </div>
        </div>
      </div>
    </Card>
  );
};

RestaurantItem.propTypes = propTypes;
RestaurantItem.defaultProps = defaultProps;
