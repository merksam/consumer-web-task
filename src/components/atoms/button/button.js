import React from 'react';
import classnames from 'clsx';

import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import styles from './button-style.scss';

const Button = React.forwardRef((props, ref) => {
  const { children, type, disabled, onClick } = props;
  const className = classnames(props.className, styles.button);
  return (
    <button ref={ref} className={className} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,

  /** native type attribute */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),

  /** native disabled button attribute */
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  className: undefined,
  onClick: noop,
};

export { Button };
