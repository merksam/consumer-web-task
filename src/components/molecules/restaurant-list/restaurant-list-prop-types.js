import PropTypes from 'prop-types';

export const RestaurantListMetaPropType = PropTypes.shape({
  currency: PropTypes.shape({
    type: PropTypes.string.isRequired,
    denominator: PropTypes.number.isRequired,
  }).isRequired,
  time: PropTypes.shape({
    type: PropTypes.string.isRequired,
    denominator: PropTypes.number.isRequired,
  }).isRequired,
});
