import PropTypes from 'prop-types';

export const RestaurantPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  restaurantLogo: PropTypes.string.isRequired,
  cuisines: PropTypes.arrayOf(PropTypes.string),
  shipping: PropTypes.shape({
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
    estimatedTime: PropTypes.number.isRequired,
  }).isRequired,
  info: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    minimumOrderValue: PropTypes.number.isRequired,
    ratings: PropTypes.shape({
      total: PropTypes.number.isRequired,
      score: PropTypes.shape({
        median: PropTypes.number.isRequired,
        average: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
});
