import PropTypes from 'prop-types';
import classnames from 'clsx';
import noop from 'lodash/noop';

import styles from './card-style.scss';

const Card = props => {
  const { children, isSelected, onClick, className } = props;

  const classNames = classnames(styles.card, className, {
    [styles['__is-selected']]: isSelected,
    [styles.__clickable]: onClick !== noop,
  });

  return (
    <div className={classNames} onClick={onClick}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,

  /** sets card to selected */
  isSelected: PropTypes.bool,

  onClick: PropTypes.func,
};

Card.defaultProps = {
  isSelected: false,
  className: undefined,
  onClick: noop,
};

export { Card };
