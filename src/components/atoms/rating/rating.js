import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';

import styles from './rating-style.scss';
import { Icon } from '../icon';

const propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: undefined,
};

function Rating(props) {
  const { value, className } = props;
  const classNames = classnames(styles['rating'], { [styles['low']]: value < 4.5 }, className);
  return (
    <div className={classNames}>
      <Icon name="icon-star" /> {value}
    </div>
  );
}

Rating.propTypes = propTypes;
Rating.defaultProps = defaultProps;

export { Rating };
